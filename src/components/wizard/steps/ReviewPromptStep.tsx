/**
 * Review Prompt step component
 * Displays the review prompt with previous outputs inserted
 */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useTemplateData } from "../../../hooks/useTemplateData";
import { loadPromptTemplate, replaceTokens } from "../../../utils/promptUtils";
import PromptOutput from "../../common/PromptOutput";
import PromptInstructions from "../../common/PromptInstructions";
import PromptHeaderWithCopy from "../../common/PromptHeaderWithCopy";

/**
 * Component for the Review Prompt step
 * This is the final step in the wizard
 */
const ReviewPromptStep = () => {
  const templateData = useTemplateData();

  const [template, setTemplate] = useState("");
  const [processedTemplate, setProcessedTemplate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        setLoading(true);
        const loadedTemplate = await loadPromptTemplate("prompt5.md");
        setTemplate(loadedTemplate.content);
        setError(null);
      } catch (err) {
        console.error("Failed to load template:", err);
        setError("Failed to load template. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    loadTemplate();
  }, []);

  useEffect(() => {
    if (template) {
      setProcessedTemplate(replaceTokens(template, templateData));
    }
  }, [template, templateData]);

  if (loading) {
    return <Typography>Loading template...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Alert severity="success" sx={{ mb: 3 }}>
        Congratulations! You've completed all the steps. Here's your final
        review prompt.
      </Alert>

      <Accordion defaultExpanded={false} sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="review-prompt-content"
          id="review-prompt-header"
        >
          <PromptHeaderWithCopy 
            title="Review Prompt Input"
            contentToCopy={processedTemplate}
          />
        </AccordionSummary>
        <AccordionDetails>
          <PromptOutput
            title="Review Prompt"
            value={processedTemplate}
            readOnly
          />
        </AccordionDetails>
      </Accordion>

      <PromptInstructions customMessage="Copy the prompt above and paste it into ChatGPT-4o Pro to get feedback and improvements on your code." />
    </Box>
  );
};

export default ReviewPromptStep;
