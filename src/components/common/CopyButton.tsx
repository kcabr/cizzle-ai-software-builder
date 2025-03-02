/**
 * Copy to clipboard button component
 */
import { ContentCopy } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import { copyToClipboard } from '../../utils/clipboardUtils';

interface CopyButtonProps extends Omit<ButtonProps, 'onClick'> {
  text: string;
}

/**
 * Button component that copies text to clipboard when clicked
 */
const CopyButton = ({ text, ...buttonProps }: CopyButtonProps) => {
  const handleCopy = () => {
    copyToClipboard(text);
  };

  return (
    <Button
      startIcon={<ContentCopy />}
      onClick={handleCopy}
      color="primary"
      variant="outlined"
      size="small"
      {...buttonProps}
    >
      Copy to Clipboard
    </Button>
  );
};

export default CopyButton;