/**
 * Spec Prompt step component
 * Displays the spec prompt with the request output inserted
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
import { useDispatch, useSelector } from "react-redux";
import { useTemplateData } from "../../../hooks/useTemplateData";
import { RootState } from "../../../store";
import { setSpecPromptOutput } from "../../../store/wizardSlice";
import { loadPromptTemplate, replaceTokens } from "../../../utils/promptUtils";
import PromptOutput from "../../common/PromptOutput";
import TextInput from "../../common/TextInput";
import PromptInstructions from "../../common/PromptInstructions";
import PromptHeaderWithCopy from "../../common/PromptHeaderWithCopy";

/**
 * Component for the Spec Prompt step
 */
const SpecPromptStep = () => {
  const dispatch = useDispatch();
  const { specPromptOutput } = useSelector((state: RootState) => state.wizard);
  const templateData = useTemplateData();

  const [template, setTemplate] = useState("");
  const [processedTemplate, setProcessedTemplate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        setLoading(true);
        const loadedTemplate = await loadPromptTemplate("prompt2.md");
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
    dispatch(setSpecPromptOutput(value));
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
          aria-controls="spec-prompt-content"
          id="spec-prompt-header"
        >
          <PromptHeaderWithCopy
            title="Technical Specifications Prompt"
            contentToCopy={processedTemplate}
          />
        </AccordionSummary>
        <AccordionDetails>
          <PromptOutput
            title="Spec Prompt"
            value={processedTemplate}
            readOnly
          />
        </AccordionDetails>
      </Accordion>

      <PromptInstructions />

      <TextInput
        label="Technical Specifications Response"
        value={specPromptOutput}
        onChange={handleOutputChange}
        placeholder="Paste the AI response here..."
        minRows={10}
        //helperText="Paste the complete response from non-reasoning AI Model here."
        required={true}
      />
    </Box>
  );
};

export default SpecPromptStep;
