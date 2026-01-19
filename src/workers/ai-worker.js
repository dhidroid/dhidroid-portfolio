import { pipeline, env } from '@xenova/transformers';

// Skip local model checks
env.allowLocalModels = false;
env.useBrowserCache = false;
env.useFSCache = false; // Disable file system cache (not needed in browser)
env.useCustomCache = false; // Use standard Cache API
env.backends.onnx.wasm.numThreads = 1; // Prevent high CPU usage on mobile

class MyPipeline {
  static task = 'text2text-generation';
  static model = 'Xenova/LaMini-Flan-T5-248M';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

class MyTTSPipeline {
  static task = 'text-to-speech';
  static model = 'Xenova/speecht5_tts';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}


self.addEventListener('message', async (event) => {
  const { type, text, context, id } = event.data;

  if (type === 'load') {
    // Just report ready, don't pre-load the text model to save bandwidth/storage
    // The models will be lazy-loaded when requested (generate or tts)
    self.postMessage({ status: 'ready' });
    return;
  }

  if (type === 'generate') {
    try {
      let generator = await MyPipeline.getInstance();
      
      // Construct prompt based on context
      let prompt = text;
      if (context) {
        prompt = `Context: ${context}\n\nUser: ${text}\n\nAssistant:`;
      }
      
      const output = await generator(prompt, {
        max_new_tokens: 250,
        temperature: 0.7,
        do_sample: true,
        top_k: 50,
      });

      self.postMessage({
        status: 'complete',
        output: output[0].generated_text,
        id,   // Echo back the ID
        type  // Echo back the type
      });
    } catch (err) {
      self.postMessage({ status: 'error', error: err.message, id, type });
    }
  }

  if (type === 'tts') {
    try {
      let speaker_embeddings = 'https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';
      const synthesizer = await MyTTSPipeline.getInstance(x => {
        self.postMessage({ status: 'progress', ...x });
      });

      // Simple sentence splitting (can be improved)
      const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];

      for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i].trim();
        if (sentence.length === 0) continue;

        const output = await synthesizer(sentence, {
          speaker_embeddings,
        });

        self.postMessage({
          status: 'complete',
          output: output,
          id,
          type,
          isChunk: true,
          chunkIndex: i,
          totalChunks: sentences.length // Approximation, might not be needed if just streaming
        });
      }

    } catch (err) {
      self.postMessage({ status: 'error', error: err.message, id, type });
    }
  }
});

