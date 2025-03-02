/**
 * Text input component with markdown support
 */
import { Box, Paper, TextField, Typography } from '@mui/material';
import { ReactNode } from 'react';
import TokenCounter from './TokenCounter';
import { textAreaStyles } from '../../utils/textStyles';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
  helperText?: ReactNode;
  showTokenCount?: boolean;
  required?: boolean;
}

/**
 * Enhanced text input component with token counting
 */
const TextInput = ({
  value,
  onChange,
  label,
  placeholder,
  minRows = 4,
  maxRows = 20,
  helperText,
  showTokenCount = true,
  required = false,
}: TextInputProps) => {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6">
          {label}
        </Typography>
        {showTokenCount && <TokenCounter text={value} />}
      </Box>
      
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        multiline
        minRows={minRows}
        maxRows={maxRows}
        fullWidth
        variant="outlined"
        required={required}
        sx={{ mb: 2, ...textAreaStyles }}
      />
      
      {helperText && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">{helperText}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TextInput;