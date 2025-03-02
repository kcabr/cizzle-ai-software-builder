/**
 * Utility functions for clipboard operations
 */
import toast from 'react-hot-toast';

/**
 * Copy text to the clipboard
 * @param text The text to copy to the clipboard
 * @returns Promise that resolves when the text is copied
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  } catch (error) {
    console.error('Failed to copy text:', error);
    toast.error('Failed to copy to clipboard');
  }
};