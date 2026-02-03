
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, FastForward, RotateCcw, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAI } from '../../context/AIContext';
import { KokoroTTS } from "kokoro-js";

interface PodcastPlayerProps {
    title: string;
    seriesTitle?: string;
    description?: string;
    content?: string;
    spotifyUrl?: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
    title,
    seriesTitle = "Audio Article",
    content,
    spotifyUrl
}) => {
    const { generateSpeech, worker, isTTSReady } = useAI();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("00:00");
    // const [duration, setDuration] = useState("00:00"); // Duration is hard to know with streaming
    const [isWaitingForData, setIsWaitingForData] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es' | 'fr'>('en');

    const languageModels = {
        'en': { model: 'Xenova/speecht5_tts', embeddings: 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin' },
        'es': { model: 'Xenova/mms-tts-spa' },
        'fr': { model: 'Xenova/mms-tts-fra' }
    };


    // new tts playback refs
    const ismodeliD: string = 'onnx-community/Kokoro-82M-ONNX'
    const tts = KokoroTTS.from_pretrained(ismodeliD, {
        dtype: "q8", // Options: "fp32", "fp16", "q8", "q4", "q4f16"
    });
    const newModel = {
        model: ismodeliD,
        embeddings: 'https://huggingface.co/datasets/onnx-community/Kokoro-82M-ONNX/resolve/main/speaker_embeddings.bin'

    }

    const speechAudioRef = useRef<HTMLAudioElement>(new Audio());
    const audioQueue = useRef<string[]>([]);
    const isPlayingChunk = useRef(false);
    const hasStartedGeneration = useRef(false);

    const stopAll = () => {
        speechAudioRef.current.pause();
        speechAudioRef.current.currentTime = 0;
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime("00:00");

        // Clear queue
        audioQueue.current = [];
        isPlayingChunk.current = false;
        hasStartedGeneration.current = false;
    };

    const processContent = async () => {
        if (!worker || !content) return;
        setIsWaitingForData(true);
        hasStartedGeneration.current = true;

        const config = languageModels[selectedLanguage] as { model: string; embeddings?: string };
        generateSpeech(content, {
            model: config.model,
            speaker_embeddings: config.embeddings
        });
    };

    const playNextChunk = () => {
        if (audioQueue.current.length > 0) {
            const nextUrl = audioQueue.current.shift();
            if (nextUrl) {
                isPlayingChunk.current = true;
                speechAudioRef.current.src = nextUrl;
                speechAudioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setIsWaitingForData(false);
                    })
                    .catch(e => console.error("Playback error", e));
            }
        } else {
            isPlayingChunk.current = false;
            // If we are waiting for more generation, keep playing state true? 
            // Ideally we'd know if generation is DONE. For now, if queue empty and stopped, we pause.
            // But if generation is still happening, we might just be buffering.
            // Simplified: if queue empty, just stop for now, user can click play again if more comes.
            // Or better: show buffering if we expect more? 
            // For this iteration, let's auto-pause if empty.
            // setIsPlaying(false); // Only pause if we really think we are done.
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            speechAudioRef.current.pause();
            setIsPlaying(false);
        } else {
            if (isPlayingChunk.current) {
                speechAudioRef.current.play();
                setIsPlaying(true);
            } else if (hasStartedGeneration.current && audioQueue.current.length > 0) {
                playNextChunk();
            } else {
                processContent();
            }
        }
    };

    const formatTime = (time: number) => {
        const m = Math.floor((time / 60));
        const s = Math.floor(time % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const audio = speechAudioRef.current;

        const updateProgress = () => {
            const current = audio.currentTime;
            // const total = audio.duration; 
            // Progress is tricky with chunks. We might just show visualizer active.
            setCurrentTime(formatTime(current));
        };

        const onEnded = () => {
            // Chunk ended, play next
            playNextChunk();
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', onEnded);
        };
    }, []);

    // Listen for worker messages for audio data
    useEffect(() => {
        if (!worker) return;
        const handleMessage = (e: MessageEvent) => {
            const { type, status, output, isChunk } = e.data;
            if (type === 'tts' && status === 'complete') {
                setIsWaitingForData(false);

                const blob = new Blob([encodeWAV(output.audio, output.sampling_rate)], { type: 'audio/wav' });
                const url = URL.createObjectURL(blob);

                audioQueue.current.push(url);

                if (!isPlayingChunk.current && isPlaying) {
                    // If we were waiting for data (buffering) and playing was active, resume
                    playNextChunk();
                } else if (!isPlayingChunk.current && !hasStartedGeneration.current) {
                    // First chunk after manual start? logic handles this in togglePlay mostly
                } else if (!isPlayingChunk.current && audioQueue.current.length === 1 && hasStartedGeneration.current) {
                    // Auto-start first chunk
                    playNextChunk();
                }
            }
        };
        worker.addEventListener('message', handleMessage);
        return () => worker.removeEventListener('message', handleMessage);
    }, [worker, isPlaying]); // Depend on isPlaying to resume if buffering

    // WAV Encoder helper
    const encodeWAV = (samples: Float32Array, sampleRate: number) => {
        const buffer = new ArrayBuffer(44 + samples.length * 2);
        const view = new DataView(buffer);
        const writeString = (offset: number, string: string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        writeString(0, 'RIFF');
        view.setUint32(4, 36 + samples.length * 2, true);
        writeString(8, 'WAVE');
        writeString(12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, 1, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * 2, true);
        view.setUint16(32, 2, true);
        view.setUint16(34, 16, true);
        writeString(36, 'data');
        view.setUint32(40, samples.length * 2, true);

        const floatTo16BitPCM = (output: DataView, offset: number, input: Float32Array) => {
            for (let i = 0; i < input.length; i++, offset += 2) {
                const s = Math.max(-1, Math.min(1, input[i]));
                output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }
        };

        floatTo16BitPCM(view, 44, samples);
        return buffer;
    };


    return (
        <div className="w-full bg-white border border-gray-200 p-8 md:p-10 font-sans shadow-sm">
            <div className="flex flex-col gap-8">

                {/* Header & Meta - Pricing Style */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
                                {seriesTitle}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] font-mono font-medium text-gray-500 uppercase tracking-wider">
                                <Volume2 size={12} className={isTTSReady ? "text-green-600" : "text-gray-400"} />
                                <span>{isTTSReady ? "AI Module Active" : "Initializing..."}</span>
                            </div>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 leading-tight">
                            {title}
                        </h3>
                    </div>

                    {/* Minimal Language Selector */}
                    <div className="flex items-center border border-gray-200 h-10 px-2 bg-gray-50/50">
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value as any)}
                            className="bg-transparent text-sm font-medium text-gray-600 focus:outline-none cursor-pointer tracking-wide"
                        >
                            <option value="en">English US</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                        </select>
                    </div>
                </div>

                {/* Progress / Status */}
                <div className="space-y-3">
                    <div className="h-1 w-full bg-gray-100 overflow-hidden">
                        {isWaitingForData && (
                            <div className="h-full bg-primary/20 w-full animate-pulse" />
                        )}
                    </div>
                </div>

                {/* Pricing Style Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={togglePlay}
                            disabled={isWaitingForData && !isPlaying}
                            className={cn(
                                "w-16 h-16 bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all duration-200 shadow-xl",
                                (isWaitingForData && !isPlaying) && "opacity-90 cursor-wait"
                            )}
                        >
                            {isWaitingForData ? (
                                <Loader2 className="w-6 h-6 animate-spin text-white/50" />
                            ) : isPlaying ? (
                                <Pause size={24} fill="currentColor" />
                            ) : (
                                <Play size={24} fill="currentColor" className="ml-1" />
                            )}
                        </button>

                        <div className="flex flex-col">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-900">
                                {isPlaying ? "Now Playing" : "Listen Audio"}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-gray-400 font-mono mt-1">
                                {isWaitingForData ? "Buffering..." : "AI Generated"}
                            </span>
                        </div>

                        <div className="hidden md:flex items-center gap-2 ml-4">
                            <button onClick={() => stopAll()} className="p-3 text-gray-400 hover:text-red-500 transition-colors" title="Stop & Reset">
                                <RotateCcw size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {spotifyUrl && (
                            <a
                                href={spotifyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#1DB954] transition-colors"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-current group-hover:animate-pulse" />
                                Spotify
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PodcastPlayer;
