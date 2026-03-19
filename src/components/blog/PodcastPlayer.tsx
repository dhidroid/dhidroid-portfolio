
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, RotateCcw, Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PodcastPlayerProps {
    title: string;
    seriesTitle?: string;
    description?: string;
    content?: string;
    spotifyUrl?: string;
    coverImage?: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
    title,
    seriesTitle = "Audio Article",
    content,
    spotifyUrl,
    coverImage
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isWaitingForData, setIsWaitingForData] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh'>('en');
    const [isTTSReady, setIsTTSReady] = useState(false);
    const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0, status: '' });

    const kokoroConfig = {
        'en': { voice: 'af_heart', lang: 'en' },
        'es': { voice: 'ef_dora', lang: 'es' },
        'fr': { voice: 'ff_siwis', lang: 'fr' },
        'de': { voice: 'ef_anna', lang: 'de' },
        'ja': { voice: 'jf_athena', lang: 'ja' },
        'zh': { voice: 'zf_xiang', lang: 'zh' },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ttsRef = useRef<any>(null);
    const ttsLoadingRef = useRef(false);

    const speechAudioRef = useRef<HTMLAudioElement>(new Audio());
    const audioQueue = useRef<string[]>([]);
    const isPlayingChunk = useRef(false);
    const hasStartedGeneration = useRef(false);
    const generationAbortRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const loadKokoro = async () => {
            if (ttsRef.current || ttsLoadingRef.current) return;
            ttsLoadingRef.current = true;
            setGenerationProgress({ current: 0, total: 0, status: 'Loading AI model...' });
            
            try {
                const { KokoroTTS } = await import("kokoro-js");
                ttsRef.current = await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-ONNX', { 
                    dtype: "q8" 
                });
                setIsTTSReady(true);
                setGenerationProgress({ current: 0, total: 0, status: '' });
            } catch (err) {
                console.error('Failed to load Kokoro TTS:', err);
                setGenerationProgress({ current: 0, total: 0, status: 'Failed to load AI' });
            } finally {
                ttsLoadingRef.current = false;
            }
        };
        loadKokoro();
    }, []);

    const stopAll = () => {
        speechAudioRef.current.pause();
        speechAudioRef.current.currentTime = 0;
        setIsPlaying(false);

        audioQueue.current = [];
        isPlayingChunk.current = false;
        hasStartedGeneration.current = false;
        
        if (generationAbortRef.current) {
            generationAbortRef.current.abort();
            generationAbortRef.current = null;
        }
        
        setGenerationProgress({ current: 0, total: 0, status: '' });
    };

    const splitIntoSentences = (text: string): string[] => {
        const sentences = text.match(/[^.!?。]+[.!?。]+|[^.!?。]+$/g) || [text];
        return sentences.filter(s => s.trim().length > 0);
    };

    const processContent = useCallback(async () => {
        if (!ttsRef.current || !content) return;
        
        setIsWaitingForData(true);
        hasStartedGeneration.current = true;
        generationAbortRef.current = new AbortController();

        const config = kokoroConfig[selectedLanguage];
        const voice = config.voice;
        
        const sentences = splitIntoSentences(content);
        const totalSentences = sentences.length;
        setGenerationProgress({ current: 0, total: totalSentences, status: 'Generating audio...' });
        
        for (let i = 0; i < sentences.length; i++) {
            if (generationAbortRef.current?.signal.aborted) break;
            
            const sentence = sentences[i];
            setGenerationProgress({ 
                current: i + 1, 
                total: totalSentences, 
                status: `Processing ${i + 1} of ${totalSentences}...` 
            });
            
            try {
                const audio = await ttsRef.current.generate(sentence, {
                    voice: voice,
                });
                
                const wavBuffer = audio.wav;
                const blob = new Blob([wavBuffer], { type: 'audio/wav' });
                const url = URL.createObjectURL(blob);
                
                audioQueue.current.push(url);
                
                if (!isPlayingChunk.current && !hasStartedGeneration.current) {
                    playNextChunk();
                } else if (!isPlayingChunk.current && audioQueue.current.length === 1) {
                    playNextChunk();
                }
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    console.error('TTS generation error:', err);
                }
            }
        }
        
        setIsWaitingForData(false);
        setGenerationProgress({ current: 0, total: 0, status: '' });
    }, [content, selectedLanguage]);

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

    useEffect(() => {
        const audio = speechAudioRef.current;

        const onEnded = () => {
            playNextChunk();
        };

        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('ended', onEnded);
        };
    }, [playNextChunk]);

    useEffect(() => {
        return () => {
            audioQueue.current.forEach(url => URL.revokeObjectURL(url));
            audioQueue.current = [];
        };
    }, []);

    const getStatusMessage = () => {
        if (!isTTSReady) return 'Loading AI...';
        if (generationProgress.status) return generationProgress.status;
        if (isWaitingForData) return 'Generating audio...';
        return 'AI Generated';
    };

    const getProgressPercent = () => {
        if (generationProgress.total > 0) {
            return Math.round((generationProgress.current / generationProgress.total) * 100);
        }
        return 0;
    };


    return (
        <div className="w-full bg-white border border-gray-200 p-8 md:p-10 font-sans shadow-sm">
            <div className="flex flex-col gap-8">

                {/* Header & Meta - Pricing Style */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex items-start gap-5">
                        {coverImage && (
                            <div className="hidden md:flex w-20 h-20 rounded-lg overflow-hidden shadow-md flex-shrink-0">
                                <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                            </div>
                        )}
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
                    </div>

                    {/* Minimal Language Selector */}
                    <div className="flex items-center border border-gray-200 h-10 px-2 bg-gray-50/50">
                        <select
                            value={selectedLanguage}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onChange={(e) => setSelectedLanguage(e.target.value as any)}
                            className="bg-transparent text-sm font-medium text-gray-600 focus:outline-none cursor-pointer tracking-wide"
                        >
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                            <option value="ja">日本語</option>
                            <option value="zh">中文</option>
                        </select>
                    </div>
                </div>

                {/* Progress / Status */}
                <div className="space-y-3">
                    <div className="h-1 w-full bg-gray-100 overflow-hidden rounded-full">
                        {isWaitingForData && generationProgress.total > 0 && (
                            <div 
                                className="h-full bg-primary transition-all duration-300 ease-out"
                                style={{ width: `${getProgressPercent()}%` }}
                            />
                        )}
                        {isWaitingForData && generationProgress.total > 0 && (
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-[10px] text-gray-500 font-mono">
                                    {generationProgress.status}
                                </span>
                                <span className="text-[10px] text-gray-500 font-mono">
                                    {getProgressPercent()}%
                                </span>
                            </div>
                        )}
                        {isWaitingForData && !generationProgress.total && (
                            <div className="h-full bg-primary/30 w-full animate-pulse rounded-full" />
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
                                {getStatusMessage()}
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
