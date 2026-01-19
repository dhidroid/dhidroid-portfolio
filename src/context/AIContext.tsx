import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AIContextType {
  worker: Worker | null;
  isModelReady: boolean;
  loadingProgress: number | null;
  generateText: (text: string, context?: string, id?: string) => void;
  generateSpeech: (text: string, options?: { model?: string, speaker_embeddings?: string }, id?: string) => void;
  isTTSReady: boolean;
}

const AIContext = createContext<AIContextType>({
  worker: null,
  isModelReady: false,
  loadingProgress: null,
  generateText: () => {},
  generateSpeech: () => { },
  isTTSReady: false,
});

export const useAI = () => useContext(AIContext);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const workerRef = useRef<Worker | null>(null);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isTTSReady, setIsTTSReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState<number | null>(null);

  useEffect(() => {
    // Only create worker if it doesn't exist
    if (!workerRef.current) {
      const worker = new Worker(new URL('../workers/ai-worker.js', import.meta.url), {
        type: 'module'
      });
      workerRef.current = worker;

      const handleMessage = (e: MessageEvent) => {
        const { status, file, progress } = e.data;
        
        if (status === 'progress' && file?.includes('model')) {
          setLoadingProgress(Math.round(progress));
        } else if (status === 'ready') {
          setIsModelReady(true);
          setIsTTSReady(true); // Assuming 'ready' means all pipelines initialized or at least worker is up
          setLoadingProgress(null);
        } else if (status === 'complete' && e.data.type === 'tts') {
          // Handle completion if needed globally, mainly consumed by component via event listener usually 
          // but here we just need to know if TTS component is ready.
          // Actually, 'ready' event is general. Let's add specific check if we want lazy load.
          // For now, we'll assume general readiness.
        }
      };

      worker.addEventListener('message', handleMessage);
      worker.postMessage({ type: 'load' });

      // Cleanup function
      return () => {
        worker.removeEventListener('message', handleMessage);
        worker.terminate();
        workerRef.current = null;
      };
    }
  }, []);

  const generateText = (text: string, context: string = '', id: string = Date.now().toString()) => {
    workerRef.current?.postMessage({
      type: 'generate',
      text,
      context,
      id
    });
  };

  const generateSpeech = (text: string, options: { model?: string, speaker_embeddings?: string } = {}, id: string = Date.now().toString()) => {
    workerRef.current?.postMessage({
      type: 'tts',
      text,
      id,
      ...options
    });
  };

  return (
    <AIContext.Provider value={{ 
      worker: workerRef.current, 
      isModelReady, 
      loadingProgress,
      generateText,
      generateSpeech,
      isTTSReady
    }}>
      {children}
    </AIContext.Provider>
  );
};
