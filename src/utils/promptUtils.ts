/**
 * Utility functions for working with prompts
 */
import { encode } from "gpt-tokenizer";
import { PromptTemplate, TemplateData } from "../types";

/**
 * Calculate the number of tokens in a text using GPT tokenizer
 * @param text The text to calculate tokens for
 * @returns The number of tokens in the text
 */
export const calculateTokens = (text: string): number => {
  if (!text) return 0;
  return encode(text).length;
};

/**
 * Replace template tokens in a string with values from a data object
 * @param template The template string containing tokens like {{TOKEN_NAME}}
 * @param data Object containing key-value pairs to replace tokens
 * @returns The template with all tokens replaced with their values
 */
export const replaceTokens = (template: string, data: TemplateData): string => {
  // Instead of modifying the template iteratively which can cause cascading replacements,
  // we'll collect all the replacements first and then apply them all at once

  // Create a map of token -> replacement
  const replacements = new Map();

  // Collect all tokens and their replacements
  Object.entries(data).forEach(([key, value]) => {
    const token = `{{${key}}}`;
    replacements.set(token, value || "");
  });

  // Find all potential token matches in the template
  const tokenRegex = /{{([A-Z_]+)}}/g;
  let result = template;

  // Apply replacements in a single pass
  result = result.replace(tokenRegex, (match) => {
    return replacements.has(match) ? replacements.get(match) : match;
  });

  return result;
};

/**
 * Load a prompt template from the public directory
 * @param fileName The name of the template file
 * @returns Promise resolving to the template content
 */
export const loadPromptTemplate = async (
  fileName: string
): Promise<PromptTemplate> => {
  try {
    const response = await fetch(`/_Support/${fileName}`);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${fileName}`);
    }
    const content = await response.text();
    return { content, fileName };
  } catch (error) {
    console.error("Error loading template:", error);
    throw error;
  }
};
