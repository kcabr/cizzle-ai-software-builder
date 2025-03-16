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
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTemplateData } from "../../../hooks/useTemplateData";
import { RootState } from "../../../store";
import {
  setCodeGenPromptOutput,
  setCodeGenPromptType,
} from "../../../store/wizardSlice";
import { loadPromptTemplate, replaceTokens } from "../../../utils/promptUtils";
import PromptOutput from "../../common/PromptOutput";
import TextInput from "../../common/TextInput";
import PromptInstructions from "../../common/PromptInstructions";
import PromptHeaderWithCopy from "../../common/PromptHeaderWithCopy";
import { CodeGenPromptType } from "../../../types";

/**
 * Component for the Code Generation Prompt step
 */
const CodeGenPromptStep = () => {
  const dispatch = useDispatch();
  const { codeGenPromptOutput, codeGenPromptType } = useSelector(
    (state: RootState) => state.wizard
  );
  const templateData = useTemplateData();

  const [standardTemplate, setStandardTemplate] = useState("");
  const [advancedTemplate, setAdvancedTemplate] = useState("");
  const [processedTemplate, setProcessedTemplate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleOutputChange = (value: string) => {
    dispatch(setCodeGenPromptOutput(value));
  };

  if (loading) {
    return <Typography>Loading templates...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
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
            title={`Code Generation Prompt (${
              codeGenPromptType === "standard" ? "Standard" : "Advanced XML"
            })`}
            value={processedTemplate}
            readOnly
          />
        </AccordionDetails>
      </Accordion>

      <PromptInstructions />

      <TextInput
        label="Code Generation Response"
        value={codeGenPromptOutput}
        onChange={handleOutputChange}
        placeholder="Paste the AI responses here..."
        minRows={10}
        //helperText="Paste the complete response from non-reasoning AI Model here."
        required={true}
      />
    </Box>
  );
};

export default CodeGenPromptStep;
