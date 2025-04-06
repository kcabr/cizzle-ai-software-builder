/**
 * Primary type definitions for the application
 */

export type WizardStep =
  | "idea"
  | "projectRules"
  | "frameworkDocs"
  | "starterTemplate"
  | "requestPrompt"
  | "specPrompt"
  | "plannerPrompt"
  | "codeGenPrompt";

export type CodeGenPromptType = "standard" | "advanced";

export interface WizardState {
  currentStep: WizardStep;
  idea: string;
  projectRules: string;
  projectRulesDefault: string | null;
  frameworkDocs: string;
  starterTemplate: string;
  starterTemplateDefault: string | null;
  requestPromptOutput: string;
  specPromptOutput: string;
  plannerPromptOutput: string;
  codeGenPromptOutput: string;
  codeGenPromptType: CodeGenPromptType;
  existingCode: string;
  aiApiKey: string | null;
  aiEndpoint: string | null;
}

export interface PromptTemplate {
  content: string;
  fileName: string;
}

export interface TemplateData {
  [key: string]: string;
}
