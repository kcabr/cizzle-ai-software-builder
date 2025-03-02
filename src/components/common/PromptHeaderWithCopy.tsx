/**
 * Reusable header with copy button component for prompt sections
 */
import { Box, Button, Typography } from '@mui/material';
import { CopyAllOutlined } from '@mui/icons-material';
import { copyToClipboard } from '../../utils/clipboardUtils';

interface PromptHeaderWithCopyProps {
  /**
   * The title text to display
   */
  title: string;
  /**
   * The content to copy when the button is clicked
   */
  contentToCopy: string;
}

/**
 * Component for displaying a heading with a copy button
 */
const PromptHeaderWithCopy = ({ 
  title,
  contentToCopy
}: PromptHeaderWithCopyProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
        {title}
        <Button 
          size="small"
          variant="text"
          color="inherit"
          sx={{ 
            minWidth: 'unset', 
            ml: 1,
            p: 0.5,
            color: 'text.secondary',
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" }
          }}
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard(contentToCopy);
          }}
        >
          <CopyAllOutlined fontSize="small" />
        </Button>
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );
};

export default PromptHeaderWithCopy;