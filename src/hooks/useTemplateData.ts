/**
 * Custom hook for managing template data
 */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { TemplateData } from "../types";

/**
 * Hook that provides template data for token replacement
 * @returns Object containing all available template data
 */
export const useTemplateData = (): TemplateData => {
  const wizardState = useSelector((state: RootState) => state.wizard);

  return useMemo(
    () => ({
      IDEA: wizardState.idea,
      PROJECT_RULES: wizardState.projectRules,
      FRAMEWORK_DOCUMENTATION: wizardState.frameworkDocs,
      STARTER_TEMPLATE: wizardState.starterTemplate,
      PROJECT_REQUEST: wizardState.requestPromptOutput,
      TECHNICAL_SPECIFICATION: wizardState.specPromptOutput,
      IMPLEMENTATION_PLAN: wizardState.plannerPromptOutput,
      EXISTING_CODE: wizardState.existingCode,
      YOUR_CODE: wizardState.codeGenPromptOutput,
    }),
    [
      wizardState.idea,
      wizardState.projectRules,
      wizardState.frameworkDocs,
      wizardState.starterTemplate,
      wizardState.requestPromptOutput,
      wizardState.specPromptOutput,
      wizardState.plannerPromptOutput,
      wizardState.existingCode,
      wizardState.codeGenPromptOutput,
    ]
  );
};
