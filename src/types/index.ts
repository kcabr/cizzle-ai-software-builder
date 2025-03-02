/**
 * Primary type definitions for the application
 */

export type WizardStep = 
  | 'idea' 
  | 'projectRules' 
  | 'starterTemplate' 
  | 'requestPrompt' 
  | 'specPrompt' 
  | 'plannerPrompt' 
  | 'codeGenPrompt' 
  | 'reviewPrompt';

export type CodeGenPromptType = 'standard' | 'advanced';

export interface WizardState {
  currentStep: WizardStep;
  idea: string;
  projectRules: string;
  starterTemplate: string;
  requestPromptOutput: string;
  specPromptOutput: string;
  plannerPromptOutput: string;
  codeGenPromptOutput: string;
  codeGenPromptType: CodeGenPromptType;
  openAiApiKey: string | null;
  useAiCleaning: boolean;
}

export interface PromptTemplate {
  content: string;
  fileName: string;
}

export interface TemplateData {
  [key: string]: string;
}