/**
 * Request Prompt step component
 * Displays the request prompt with the user's idea inserted
 */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTemplateData } from "../../../hooks/useTemplateData";
import { RootState } from "../../../store";
import { setRequestPromptOutput } from "../../../store/wizardSlice";
import { loadPromptTemplate, replaceTokens } from "../../../utils/promptUtils";
import PromptOutput from "../../common/PromptOutput";
import TextInput from "../../common/TextInput";
import PromptInstructions from "../../common/PromptInstructions";
import PromptHeaderWithCopy from "../../common/PromptHeaderWithCopy";
import { ExpandMore } from "@mui/icons-material";

/**
 * Component for the Request Prompt step
 */
const RequestPromptStep = () => {
  const dispatch = useDispatch();
  const { requestPromptOutput } = useSelector(
    (state: RootState) => state.wizard
  );
  const templateData = useTemplateData();

  const [template, setTemplate] = useState("");
  const [processedTemplate, setProcessedTemplate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        setLoading(true);
        const loadedTemplate = await loadPromptTemplate("prompt1.md");
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

  const handleOutputChange = (value: string) => {
    dispatch(setRequestPromptOutput(value));
  };

  if (loading) {
    return <Typography>Loading template...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Accordion defaultExpanded={false} sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="request-prompt-content"
          id="request-prompt-header"
        >
          <PromptHeaderWithCopy
            title="Request Prompt Input"
            contentToCopy={processedTemplate}
          />
        </AccordionSummary>
        <AccordionDetails>
          <PromptOutput
            title="Request Prompt"
            value={processedTemplate}
            readOnly
          />
        </AccordionDetails>
      </Accordion>

      <PromptInstructions customMessage="Copy the prompt above and paste it into ChatGPT-4o. Iterate and answer the questions until you have the final output. Once you have the final output, paste it below." />

      <TextInput
        label="Request Response"
        value={requestPromptOutput}
        onChange={handleOutputChange}
        placeholder="Paste the ChatGPT response here..."
        minRows={10}
        //helperText="Paste the complete response from ChatGPT here."
        required={true}
      />
    </Box>
  );
};

export default RequestPromptStep;
