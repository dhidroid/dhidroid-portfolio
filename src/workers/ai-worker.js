import { pipeline, env } from '@xenova/transformers';

// Skip local model checks
env.allowLocalModels = false;
env.useBrowserCache = true;
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

self.addEventListener('message', async (event) => {
  const { type, text, context, id } = event.data;

  if (type === 'load') {
    try {
      // Only initialize if not already initialized
      if (MyPipeline.instance === null) {
        await MyPipeline.getInstance(x => {
          self.postMessage({ status: 'progress', ...x });
        });
      }
      self.postMessage({ status: 'ready' });
    } catch (err) {
      self.postMessage({ status: 'error', error: err.message });
    }
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
});
