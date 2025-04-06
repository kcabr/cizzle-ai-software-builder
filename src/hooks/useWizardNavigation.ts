/**
 * Custom hook for wizard navigation
 */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCurrentStep } from "../store/wizardSlice";
import { WizardStep } from "../types";

// Define the step order for navigation
const STEP_ORDER: WizardStep[] = [
  "idea",
  "projectRules",
  "frameworkDocs",
  "starterTemplate",
  "requestPrompt",
  "specPrompt",
  "plannerPrompt",
  "codeGenPrompt",
];

/**
 * Hook that provides wizard navigation utilities
 * @returns Object with navigation methods and state
 */
export const useWizardNavigation = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector(
    (state: RootState) => state.wizard.currentStep
  );

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);

  const goToNextStep = () => {
    if (currentStepIndex < STEP_ORDER.length - 1) {
      dispatch(setCurrentStep(STEP_ORDER[currentStepIndex + 1]));
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      dispatch(setCurrentStep(STEP_ORDER[currentStepIndex - 1]));
    }
  };

  const goToStep = (step: WizardStep) => {
    dispatch(setCurrentStep(step));
  };

  const canGoNext = currentStepIndex < STEP_ORDER.length - 1;
  const canGoPrevious = currentStepIndex > 0;

  return {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    canGoNext,
    canGoPrevious,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === STEP_ORDER.length - 1,
  };
};
