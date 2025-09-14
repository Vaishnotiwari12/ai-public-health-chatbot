// Ensure the API URL ends with a slash
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');

export const chatWithAI = (message, chatHistory = []) => {
  console.log('Sending message to:', `${API_BASE_URL}/api/chat`);
  
  // Create a controller to manage the connection
  const controller = {
    abort: null,
    onChunk: null,
    onError: null,
    onComplete: null
  };

  // Create a new AbortController for the fetch request
  const abortController = new AbortController();
  controller.abort = () => abortController.abort();

  // Start the fetch request with POST and JSON body
  fetch(`${API_BASE_URL}/api/chat`, {
    method: 'POST',
    signal: abortController.signal,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/plain',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    },
    credentials: 'include',
    body: JSON.stringify({
      query: message,
      chatHistory: chatHistory
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('ReadableStream not supported in this browser');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let fullResponse = '';

    function processText({ done, value }) {
      if (done) {
        if (controller.onComplete) {
          controller.onComplete(fullResponse);
        }
        return;
      }

      // Decode the chunk of data
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      // Process each line in the buffer
      const lines = buffer.split('\n\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();
          if (data === '[DONE]') {
            if (controller.onComplete) {
              controller.onComplete(fullResponse);
            }
            return;
          }

          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              fullResponse += parsed.content;
              if (controller.onChunk) {
                controller.onChunk(parsed.content, fullResponse);
              }
            }
          } catch (e) {
            console.error('Error parsing SSE data:', e);
          }
        }
      }

      // Read the next chunk
      return reader.read().then(processText);
    }

    // Start reading the stream
    return reader.read().then(processText);
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch aborted');
    } else if (controller.onError) {
      controller.onError(error);
    }
  });

  return controller;
};

// Add a function to test the API connection
export const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`);
    return await response.json();
  } catch (error) {
    console.error('Connection test failed:', error);
    throw error;
  }
};
