/**
 * Planner Prompt step component
 * Displays the planner prompt with previous outputs inserted
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
import { setPlannerPromptOutput } from "../../../store/wizardSlice";
import { loadPromptTemplate, replaceTokens } from "../../../utils/promptUtils";
import PromptOutput from "../../common/PromptOutput";
import TextInput from "../../common/TextInput";
import PromptInstructions from "../../common/PromptInstructions";
import PromptHeaderWithCopy from "../../common/PromptHeaderWithCopy";

/**
 * Component for the Planner Prompt step
 */
const PlannerPromptStep = () => {
  const dispatch = useDispatch();
  const { plannerPromptOutput } = useSelector(
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
        const loadedTemplate = await loadPromptTemplate("prompt3.md");
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
    dispatch(setPlannerPromptOutput(value));
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
          aria-controls="planner-prompt-content"
          id="planner-prompt-header"
        >
          <PromptHeaderWithCopy 
            title="Planner Prompt" 
            contentToCopy={processedTemplate} 
          />
        </AccordionSummary>
        <AccordionDetails>
          <PromptOutput
            title="Planner Prompt"
            value={processedTemplate}
            readOnly
          />
        </AccordionDetails>
      </Accordion>

      <PromptInstructions />

      <TextInput
        label="Planner Response"
        value={plannerPromptOutput}
        onChange={handleOutputChange}
        placeholder="Paste the ChatGPT response here..."
        minRows={10}
        helperText="Paste the complete response from ChatGPT here."
        required={true}
      />
    </Box>
  );
};

export default PlannerPromptStep;
