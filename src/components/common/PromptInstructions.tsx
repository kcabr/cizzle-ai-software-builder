/**
 * Reusable prompt instructions component
 * Displays standardized instructions for copying prompts to ChatGPT
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
    "Copy the prompt above and paste it into ChatGPT-o1 Pro. Once you have the response, paste it below.";

  return (
    <Alert severity="info" sx={sx}>
      {customMessage || defaultMessage}
    </Alert>
  );
};

export default PromptInstructions;
