/**
 * Centralized text styling utilities for consistent text display throughout the application
 */
import { SxProps, Theme } from '@mui/material';

/**
 * Common styles for text areas and other text displays
 */
export const textAreaStyles: SxProps<Theme> = {
  '& .MuiInputBase-input': {
    fontSize: '0.8rem',
    lineHeight: 1.4,
    fontFamily: '"Roboto Mono", monospace',
  },
  '& .MuiOutlinedInput-root': {
    fontSize: '0.8rem',
  }
};

/**
 * Common styles for text with syntax highlighting
 */
export const codeTextStyles: SxProps<Theme> = {
  ...textAreaStyles,
  '& .MuiInputBase-input': {
    ...textAreaStyles['& .MuiInputBase-input'],
    fontFamily: '"Roboto Mono", monospace',
  }
};

/**
 * Common styles for token counter and other utilities
 */
export const utilityTextStyles: SxProps<Theme> = {
  fontSize: '0.75rem',
};

export default {
  textAreaStyles,
  codeTextStyles,
  utilityTextStyles
};