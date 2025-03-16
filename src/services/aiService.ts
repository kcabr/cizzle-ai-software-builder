/**
 * Service for AI API operations
 */

/**
 * Clean the given text using AI API
 * @param text The text to clean
 * @param apiKey The API key
 * @param endpoint The API endpoint URL
 * @returns Promise resolving to the cleaned text
 */
export const cleanTextWithAI = async (text: string, apiKey: string, endpoint: string): Promise<string> => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that helps clean and format web app ideas. Your task is to improve the given text to make it clearer, more concise, and better structured, while preserving all the original intent. Format the output as markdown.'
          },
          {
            role: 'user',
            content: `Please clean and format the following web app idea:\n\n${text}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error cleaning text with AI:', error);
    throw error;
  }
};