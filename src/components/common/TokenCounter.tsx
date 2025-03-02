/**
 * Token counter component
 */
import { Chip, ChipProps } from '@mui/material';
import { useMemo } from 'react';
import { calculateTokens } from '../../utils/promptUtils';

interface TokenCounterProps extends Omit<ChipProps, 'label'> {
  text: string;
}

/**
 * Component that displays the token count for a text
 */
const TokenCounter = ({ text, ...chipProps }: TokenCounterProps) => {
  const tokenCount = useMemo(() => calculateTokens(text), [text]);

  return (
    <Chip 
      label={`Tokens: ${tokenCount.toLocaleString()}`}
      color={tokenCount > 30000 ? 'error' : 'primary'}
      variant="outlined"
      size="small"
      {...chipProps}
    />
  );
};

export default TokenCounter;