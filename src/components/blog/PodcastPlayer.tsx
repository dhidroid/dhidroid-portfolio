import React, { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";
import { cn } from "../../utils/cn";

interface PodcastPlayerProps {
  title: string;
  seriesTitle?: string;
  coverImage?: string;
  content: string;
  spotifyUrl?: string;
}

export const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  title,
  seriesTitle = "Studio Podcast",
  coverImage,
  content,
  spotifyUrl
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTTSReady, setIsTTSReady] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [generationProgress, setGenerationProgress] = useState({
    current: 0,
    total: 0,
    status: ""
  });

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentSentenceIndex = useRef(0);
  const sentencesRef = useRef<string[]>([]);

  // Initialize SpeechSynthesis and check voices availability
  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setIsTTSReady(true);

      // Load voices once to warm up the cache
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }

    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const splitIntoSentences = (text: string): string[] => {
    // Strip HTML tags if any
    const cleanText = text.replace(/<[^>]*>/g, "");
    const sentences = cleanText.match(/[^.!?。]+[.!?。]+|[^.!?。]+$/g) || [cleanText];
    return sentences.map(s => s.trim()).filter(s => s.length > 0);
  };

  const getVoiceForLanguage = (langCode: string): SpeechSynthesisVoice | null => {
    if (typeof window === "undefined" || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize premium/high-quality voices
    const sorted = voices.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      if (aName.includes("natural") || aName.includes("premium")) return -1;
      if (bName.includes("natural") || bName.includes("premium")) return 1;
      return 0;
    });

    const voice = sorted.find(v => v.lang.startsWith(langCode));
    return voice || null;
  };

  const playSentence = useCallback((index: number) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (index >= sentencesRef.current.length) {
      setIsPlaying(false);
      setGenerationProgress({ current: 0, total: 0, status: "" });
      currentSentenceIndex.current = 0;
      return;
    }

    currentSentenceIndex.current = index;
    setGenerationProgress({
      current: index + 1,
      total: sentencesRef.current.length,
      status: `Reading segment ${index + 1} of ${sentencesRef.current.length}`
    });

    // Cancel current speaking before triggering next
    window.speechSynthesis.cancel();

    const textToSpeak = sentencesRef.current[index];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    const voice = getVoiceForLanguage(selectedLanguage);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = selectedLanguage;
    utterance.rate = 1.0; // Clear speaking rate

    utterance.onend = () => {
      // Continue queue
      playSentence(index + 1);
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis utterance error:", e);
      if (e.error !== "interrupted") {
        playSentence(index + 1);
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [selectedLanguage]);

  const togglePlay = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    if (isPlaying) {
      // Pause
      window.speechSynthesis.pause();
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused && utteranceRef.current) {
        // Resume
        window.speechSynthesis.resume();
        setIsPlaying(true);
      } else {
        // Start from beginning or current sentence
        window.speechSynthesis.cancel();
        if (sentencesRef.current.length === 0) {
          sentencesRef.current = splitIntoSentences(content);
        }
        setIsPlaying(true);
        playSentence(currentSentenceIndex.current);
      }
    }
  };

  const stopAll = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setGenerationProgress({ current: 0, total: 0, status: "" });
    currentSentenceIndex.current = 0;
    utteranceRef.current = null;
  };

  const getProgressPercent = () => {
    if (generationProgress.total > 0) {
      return Math.round((generationProgress.current / generationProgress.total) * 100);
    }
    return 0;
  };

  return (
    <div className="w-full bg-slate-50/50 dark:bg-zinc-900/50 border border-border p-6 md:p-8 font-mono select-none rounded-sm">
      <div className="flex flex-col gap-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            {coverImage && (
              <div className="w-16 h-16 border border-border overflow-hidden rounded-sm flex-shrink-0">
                <img src={coverImage} alt={title} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-3 mb-1.5 text-[10px]">
                <span className="bg-[#5235F6] text-white px-2 py-0.5 uppercase tracking-widest font-bold">
                  {seriesTitle}
                </span>
                <span className="flex items-center gap-1.5 text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                  <Volume2 size={12} className={isTTSReady ? "text-[#5235F6]" : "text-zinc-600"} />
                  {isTTSReady ? "NATIVE VOICE SYNTHESIS" : "INITIALIZING..."}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground font-display uppercase tracking-tight leading-tight">
                {title}
              </h3>
            </div>
          </div>

          {/* Language select tab */}
          <div className="flex items-center border border-border h-9 px-2 bg-background rounded-sm">
            <select
              value={selectedLanguage}
              onChange={(e) => {
                stopAll();
                setSelectedLanguage(e.target.value);
                sentencesRef.current = [];
              }}
              className="bg-transparent text-xs font-bold text-slate-500 dark:text-zinc-400 focus:outline-none cursor-pointer tracking-wider uppercase"
            >
              <option value="en">English (US)</option>
              <option value="es">Español (ES)</option>
              <option value="fr">Français (FR)</option>
              <option value="de">Deutsch (DE)</option>
              <option value="ja">日本語 (JP)</option>
              <option value="zh">中文 (ZH)</option>
            </select>
          </div>
        </div>

        {/* Telemetry Progress bar */}
        {isPlaying && generationProgress.total > 0 && (
          <div className="space-y-1.5">
            <div className="h-1 w-full bg-border overflow-hidden rounded-sm">
              <div
                className="h-full bg-[#5235F6] transition-all duration-300 ease-out"
                style={{ width: `${getProgressPercent()}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-zinc-500">
              <span>{generationProgress.status}</span>
              <span>{getProgressPercent()}%</span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-foreground text-background flex items-center justify-center hover:bg-[#5235F6] hover:text-white transition-all duration-200 rounded-sm cursor-pointer"
            >
              {isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" className="ml-0.5" />
              )}
            </button>

            <div className="flex flex-col text-[10px]">
              <span className="font-bold text-foreground uppercase tracking-widest">
                {isPlaying ? "READING OUT LOUD" : "STREAM ARTICLE"}
              </span>
              <span className="text-slate-400 dark:text-zinc-500 uppercase mt-0.5">
                {isPlaying ? "SPEAKING ENGINE ACTIVE" : "CLICK PLAY TO LISTEN"}
              </span>
            </div>

            {isPlaying && (
              <button
                onClick={stopAll}
                className="p-2.5 border border-border text-slate-400 dark:text-zinc-500 hover:text-red-500 hover:border-red-500 rounded-sm transition-all cursor-pointer ml-2"
                title="Reset Audio Reader"
              >
                <RotateCcw size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            {spotifyUrl && (
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 hover:text-[#1DB954] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
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
