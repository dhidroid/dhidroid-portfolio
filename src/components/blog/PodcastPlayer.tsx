import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Waves } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PodcastPlayerProps {
    title: string;
    seriesTitle?: string;
    description?: string;
    content?: string;
    audioUrl?: string; // Keep for fallback or music
    coverImage?: string;
    spotifyUrl?: string;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
    title,
    seriesTitle = "Development Journey",
    content,
    audioUrl = "https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a7345a.mp3", // Short synth intro
    coverImage,
    spotifyUrl
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("00:00:00");
    const [phase, setPhase] = useState<'idle' | 'music' | 'intro' | 'content'>('idle');
    const audioRef = useRef<HTMLAudioElement>(null);
    const synthRef = useRef<SpeechSynthesis | null>(window.speechSynthesis);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const totalCharsRef = useRef<number>(0);

    const stopAll = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        if (synthRef.current) {
            synthRef.current.cancel();
        }
        setIsPlaying(false);
        setPhase('idle');
        setProgress(0);
        setCurrentTime("00:00:00");
    };

    const playContent = (text: string) => {
        if (!synthRef.current) return;
        
        synthRef.current.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        totalCharsRef.current = text.length;
        
        // Settings for a "Podcast Style" voice
        utterance.rate = 0.95; 
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        const voices = synthRef.current.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Premium')) || voices[0];
        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onstart = () => {
            setPhase('content');
            setIsPlaying(true);
        };

        utterance.onboundary = (event) => {
            if (event.name === 'word') {
                const charIndex = event.charIndex;
                const newProgress = (charIndex / totalCharsRef.current) * 100;
                setProgress(newProgress);
                
                // Estimate time: Avg speaking rate is ~150 words per minute.
                // Text length / 5 (avg chars per word) / 150 * 60 = total seconds.
                const estimatedTotalSeconds = (totalCharsRef.current / 5) / 150 * 60;
                const currentSeconds = (charIndex / totalCharsRef.current) * estimatedTotalSeconds;
                setCurrentTime(formatTime(currentSeconds));
            }
        };

        utterance.onend = () => {
            setProgress(100);
            setTimeout(stopAll, 1000);
        };

        utterance.onerror = () => stopAll();

        utteranceRef.current = utterance;
        synthRef.current.speak(utterance);
    };

    const playIntro = () => {
        setPhase('intro');
        const intro = new SpeechSynthesisUtterance("Dhidroid");
        intro.rate = 0.8; 
        intro.pitch = 0.9;
        
        intro.onend = () => {
            if (content) {
                playContent(content);
            } else {
                stopAll();
            }
        };
        
        synthRef.current?.speak(intro);
    };

    const togglePlay = () => {
        if (isPlaying) {
            if (phase === 'music') {
                audioRef.current?.pause();
            } else if (phase === 'content' || phase === 'intro') {
                synthRef.current?.pause();
            }
            setIsPlaying(false);
        } else {
            if (phase === 'idle') {
                setPhase('music');
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                } else {
                    playIntro();
                }
            } else if (phase === 'music') {
                audioRef.current?.play();
            } else {
                synthRef.current?.resume();
            }
            setIsPlaying(true);
        }
    };

    const formatTime = (time: number) => {
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = Math.floor(time % 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onMusicEnd = () => {
            playIntro();
        };

        const updateProgress = () => {
            if (phase === 'music') {
                const current = audio.currentTime;
                const total = audio.duration;
                if (!isNaN(total) && total > 0) {
                    setProgress((current / total) * 100);
                    setCurrentTime(formatTime(current));
                }
            }
        };

        audio.addEventListener('ended', onMusicEnd);
        audio.addEventListener('timeupdate', updateProgress);

        return () => {
            audio.removeEventListener('ended', onMusicEnd);
            audio.removeEventListener('timeupdate', updateProgress);
            synthRef.current?.cancel();
        };
    }, [phase, content]);


    return (
        <div className="w-full bg-[#121212] text-white overflow-hidden shadow-2xl border border-white/5 font-sans">
            <audio ref={audioRef} src={audioUrl} />
            
            <div className="flex flex-col md:flex-row">
                {/* Left Side: Cover Art */}
                <div className="w-full md:w-64 h-64 md:h-auto bg-[#1a1b26] relative flex-shrink-0">
                    {coverImage ? (
                        <img src={coverImage} alt={title} className="w-full h-full object-cover opacity-80" />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/20 to-transparent">
                            <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mb-6">
                                <Waves className="w-8 h-8 text-primary" />
                            </div>
                            <span className="text-xl font-display font-bold text-center tracking-tight leading-tight uppercase">{seriesTitle}</span>
                            <div className="mt-8 text-[10px] font-mono uppercase tracking-widest text-primary/60">Presented by Dhidroid</div>
                        </div>
                    )}
                </div>

                {/* Right Side: Controls */}
                <div className="flex-grow flex flex-col p-8 md:p-10">
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={togglePlay}
                                className="w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 transition-transform"
                            >
                                {isPlaying ? <Pause className="fill-current" size={24} /> : <Play className="fill-current ml-1" size={24} />}
                            </button>
                            <div>
                                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                                    {phase === 'music' ? 'Intro Music' : phase === 'intro' ? 'Dhidroid Intro' : phase === 'content' ? 'Reading Content' : seriesTitle}
                                </p>
                                <h4 className="text-xl md:text-2xl font-display font-bold leading-tight">{title}</h4>
                            </div>
                        </div>
                        <div className="text-sm font-mono text-gray-400 mt-2">{currentTime}</div>
                    </div>

                    {/* Waveform Visualization (Mockup) */}
                    <div className="relative h-20 mb-8 flex items-center justify-center opacity-40">
                        <div className="flex items-end gap-[3px] w-full h-full pb-2">
                            {Array.from({ length: 60 }).map((_, i) => {
                                const height = Math.random() * 80 + 20;
                                return (
                                    <div 
                                        key={i} 
                                        className={cn(
                                            "flex-grow bg-white rounded-full transition-all duration-300",
                                            i < (progress / 100) * 60 ? "bg-primary" : "bg-white/30"
                                        )} 
                                        style={{ height: `${height}%` }}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-6 mt-auto">
                        <div className="flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
                            {spotifyUrl && (
                                <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                                    <div className="w-4 h-4 rounded-full bg-[#1DB954] flex items-center justify-center p-0.5">
                                        <Play fill="black" size={8} />
                                    </div>
                                    SAVE TO SPOTIFY
                                </a>
                            )}
                            <button className="hover:text-white transition-colors">SHARE</button>
                            <button className="hover:text-white transition-colors text-primary">SUBSCRIBE</button>
                            <button className="hover:text-white transition-colors">DESCRIPTION</button>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="flex gap-0.5 h-3 items-end">
                                <div className="w-1 h-3 bg-primary animate-pulse" style={{ animationDelay: '0ms' }} />
                                <div className="w-1 h-2 bg-primary animate-pulse" style={{ animationDelay: '200ms' }} />
                                <div className="w-1 h-3 bg-primary animate-pulse" style={{ animationDelay: '400ms' }} />
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* In this Playlist Section */}
            <div className="bg-[#1a1c22] px-10 py-5 border-t border-white/5">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500">
                    <span>IN THIS PLAYLIST</span>
                    <span>10 OF 753 EPISODES</span>
                </div>
                <div className="mt-4 flex items-center gap-4 py-2">
                    <button className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                        <Play size={14} fill="currentColor" className="ml-0.5" />
                    </button>
                    <span className="text-sm font-medium text-white/80 line-clamp-1">{title} ...30 min</span>
                </div>
            </div>
        </div>
    );
};

export default PodcastPlayer;
