/**
 * Code Generation Prompt step component
 * Displays the code generation prompt with previous outputs inserted
 */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ExpandMore, FormatListBulleted } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTemplateData } from "../../../hooks/useTemplateData";
import { RootState } from "../../../store";
import {
  setCodeGenPromptType,
  setExistingCode,
} from "../../../store/wizardSlice";
import { loadPromptTemplate, replaceTokens } from "../../../utils/promptUtils";
import PromptOutput from "../../common/PromptOutput";
import TextInput from "../../common/TextInput";
import PromptHeaderWithCopy from "../../common/PromptHeaderWithCopy";
import PlannerTaskModal from "../../common/PlannerTaskModal";
import { CodeGenPromptType } from "../../../types";

/**
 * Component for the Code Generation Prompt step
 */
const CodeGenPromptStep = () => {
  const dispatch = useDispatch();
  const { 
    codeGenPromptType, 
    existingCode, 
    starterTemplate,
    plannerPromptOutput 
  } = useSelector((state: RootState) => state.wizard);
  const templateData = useTemplateData();

  const [standardTemplate, setStandardTemplate] = useState("");
  const [advancedTemplate, setAdvancedTemplate] = useState("");
  const [processedTemplate, setProcessedTemplate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlannerModalOpen, setIsPlannerModalOpen] = useState(false);

  // Initialize existingCode with starterTemplate if it's empty
  useEffect(() => {
    if (!existingCode && starterTemplate) {
      dispatch(setExistingCode(starterTemplate));
    }
  }, [dispatch, existingCode, starterTemplate]);

  // Load both templates
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        const [standardResult, advancedResult] = await Promise.all([
          loadPromptTemplate("prompt4a.md"),
          loadPromptTemplate("prompt4b.md"),
        ]);

        setStandardTemplate(standardResult.content);
        setAdvancedTemplate(advancedResult.content);
        setError(null);
      } catch (err) {
        console.error("Failed to load templates:", err);
        setError("Failed to load templates. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  // Process the selected template when it changes
  useEffect(() => {
    if (standardTemplate && advancedTemplate) {
      const template =
        codeGenPromptType === "standard" ? standardTemplate : advancedTemplate;
      setProcessedTemplate(replaceTokens(template, templateData));
    }
  }, [standardTemplate, advancedTemplate, codeGenPromptType, templateData]);

  const handlePromptTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setCodeGenPromptType(event.target.value as CodeGenPromptType));
  };

  const handleExistingCodeChange = (value: string) => {
    dispatch(setExistingCode(value));
  };

  const openPlannerModal = () => {
    setIsPlannerModalOpen(true);
  };

  const closePlannerModal = () => {
    setIsPlannerModalOpen(false);
  };

  if (loading) {
    return <Typography>Loading templates...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      {/* Task Selection Button */}
      {plannerPromptOutput && (
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<FormatListBulleted />}
            onClick={openPlannerModal}
            fullWidth
          >
            Manage Planner Tasks
          </Button>
          <PlannerTaskModal
            open={isPlannerModalOpen}
            onClose={closePlannerModal}
            plannerText={plannerPromptOutput}
          />
        </Box>
      )}

      {/* Existing Code section in accordion */}
      <Accordion defaultExpanded={true} sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="existing-code-content"
          id="existing-code-header"
        >
          <Typography variant="h6">Existing Code</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextInput
            label="Existing Code"
            value={existingCode}
            onChange={handleExistingCodeChange}
            placeholder="Your current codebase state goes here. Initially populated with the starter template."
            minRows={10}
            helperText="This will replace the {{EXISTING_CODE}} token in the prompt template."
            required={true}
          />
        </AccordionDetails>
      </Accordion>

      <Box sx={{ my: 4 }} />

      {/* Moved the prompt type selection and accordion to the bottom */}
      <FormControl component="fieldset" sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Choose Code Generation Type
        </Typography>
        <RadioGroup
          row
          name="codeGenType"
          value={codeGenPromptType}
          onChange={handlePromptTypeChange}
        >
          <FormControlLabel
            value="standard"
            control={<Radio />}
            label="Standard"
          />
          <FormControlLabel
            value="advanced"
            control={<Radio />}
            label="Advanced XML"
          />
        </RadioGroup>
      </FormControl>

      <Accordion defaultExpanded={false} sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="codegen-prompt-content"
          id="codegen-prompt-header"
        >
          <PromptHeaderWithCopy
            title={`Code Generation Prompt (${
              codeGenPromptType === "standard" ? "Standard" : "Advanced XML"
            })`}
            contentToCopy={processedTemplate}
          />
        </AccordionSummary>
        <AccordionDetails>
          <PromptOutput
            value={processedTemplate}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default CodeGenPromptStep;
