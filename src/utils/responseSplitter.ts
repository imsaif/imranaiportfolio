/**
 * Response Splitter Utility
 * Splits long responses into smaller chunks that fit within character limits
 */

interface SplitResponse {
  chunks: string[];
  totalChunks: number;
}

/**
 * Split a response into chunks that fit within the character limit
 * Tries to split at natural break points (sentences, paragraphs)
 */
export const splitResponse = (response: string, maxChars: number = 500): SplitResponse => {
  // If response is already within limit, return as single chunk
  if (response.length <= maxChars) {
    return {
      chunks: [response],
      totalChunks: 1,
    };
  }

  const chunks: string[] = [];
  let currentChunk = '';
  let currentLength = 0;

  // Split into sentences first
  const sentences = response.split(/(?<=[.!?])\s+/);

  for (const sentence of sentences) {
    // If a single sentence is too long, split it into words
    if (sentence.length > maxChars) {
      const words = sentence.split(/\s+/);
      for (const word of words) {
        if (currentLength + word.length + 1 > maxChars) {
          chunks.push(currentChunk.trim());
          currentChunk = word;
          currentLength = word.length;
        } else {
          currentChunk += (currentChunk ? ' ' : '') + word;
          currentLength += word.length + (currentChunk ? 1 : 0);
        }
      }
    } else {
      // If adding this sentence would exceed the limit, start a new chunk
      if (currentLength + sentence.length + 1 > maxChars) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
        currentLength = sentence.length;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
        currentLength += sentence.length + (currentChunk ? 1 : 0);
      }
    }
  }

  // Add the last chunk if it's not empty
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return {
    chunks,
    totalChunks: chunks.length,
  };
};

/**
 * Format a chunk with its position in the sequence
 */
export const formatChunk = (chunk: string, index: number, total: number): string => {
  if (total === 1) return chunk;
  return `[Part ${index + 1}/${total}] ${chunk}`;
};

/**
 * Process a response and split it if necessary
 */
export const processResponse = (response: string, maxChars: number = 500): string[] => {
  const { chunks, totalChunks } = splitResponse(response, maxChars);
  return chunks.map((chunk, index) => formatChunk(chunk, index, totalChunks));
}; 