/**
 * Reusable prompt instructions component
 * Displays standardized instructions for copying prompts to non-reasoning AI Model
 */
import { Alert, AlertProps } from "@mui/material";

interface PromptInstructionsProps {
  /**
   * Optional custom message. If not provided, the default message will be used.
   */
  customMessage?: string;
  /**
   * Optional additional styling
   */
  sx?: AlertProps["sx"];
}

/**
 * Component for displaying standardized prompt instructions
 */
const PromptInstructions = ({
  customMessage,
  sx = { mb: 3 },
}: PromptInstructionsProps) => {
  const defaultMessage =
    "☝️ Review, Make Adjustments, then use in a REASONING AI Model. Paste the response below.";

  return (
    <Alert severity="info" sx={sx}>
      {customMessage || defaultMessage}
    </Alert>
  );
};

export default PromptInstructions;
