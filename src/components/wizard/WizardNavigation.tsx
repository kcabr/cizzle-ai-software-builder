/**
 * Navigation component for the wizard
 */
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Stepper,
  StepLabel,
  Step,
  Typography,
} from "@mui/material";
import { useWizardNavigation } from "../../hooks/useWizardNavigation";
import { WizardStep } from "../../types";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

// Define step labels for the stepper
const STEP_LABELS: Record<WizardStep, string> = {
  idea: "Web App Idea",
  projectRules: "Project Rules",
  starterTemplate: "Starter Template",
  requestPrompt: "Request Prompt",
  specPrompt: "Spec Prompt",
  plannerPrompt: "Planner Prompt",
  codeGenPrompt: "Code Gen Prompt",
  reviewPrompt: "Review Prompt",
};

// Define step order for the stepper
const STEP_ORDER: WizardStep[] = [
  "idea",
  "projectRules",
  "starterTemplate",
  "requestPrompt",
  "specPrompt",
  "plannerPrompt",
  "codeGenPrompt",
  "reviewPrompt",
];

interface WizardNavigationProps {
  onNext?: () => boolean | void; // Return false to prevent navigation
  onPrevious?: () => boolean | void; // Return false to prevent navigation
}

/**
 * Component for navigating between wizard steps
 * Provides buttons for next/previous and displays current step
 */
const WizardNavigation = ({ onNext, onPrevious }: WizardNavigationProps) => {
  const {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    canGoNext,
    canGoPrevious,
  } = useWizardNavigation();
  const {
    requestPromptOutput,
    specPromptOutput,
    plannerPromptOutput,
    codeGenPromptOutput,
    idea,
    projectRules,
    starterTemplate,
  } = useSelector((state: RootState) => state.wizard);

  const handleNext = () => {
    // If onNext returns false explicitly, don't navigate
    if (onNext && onNext() === false) return;
    goToNextStep();
  };

  const handlePrevious = () => {
    // If onPrevious returns false explicitly, don't navigate
    if (onPrevious && onPrevious() === false) return;
    goToPreviousStep();
  };

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);

  // Next button block override if no text inputted
  const isNextBlocked =
    (currentStep === "idea" && !idea?.trim()) ||
    (currentStep === "projectRules" && !projectRules?.trim()) ||
    (currentStep === "starterTemplate" && !starterTemplate?.trim()) ||
    (currentStep === "requestPrompt" && !requestPromptOutput?.trim()) ||
    (currentStep === "specPrompt" && !specPromptOutput?.trim()) ||
    (currentStep === "plannerPrompt" && !plannerPromptOutput?.trim());

  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 2, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Step {currentStepIndex + 1}: {STEP_LABELS[currentStep]}
      </Typography>

      <Stepper activeStep={currentStepIndex} alternativeLabel sx={{ mb: 3 }}>
        {STEP_ORDER.map((step) => (
          <Step key={step}>
            <StepLabel>{STEP_LABELS[step]}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          variant="outlined"
        >
          Previous
        </Button>

        <Button
          endIcon={<ArrowForward />}
          onClick={handleNext}
          disabled={!canGoNext || isNextBlocked}
          variant="contained"
        >
          Next
        </Button>
      </Box>
    </Paper>
  );
};

export default WizardNavigation;
