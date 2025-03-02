/**
 * Redux slice for managing the wizard state
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CodeGenPromptType, WizardState, WizardStep } from '../types';

const initialState: WizardState = {
  currentStep: 'idea',
  idea: '',
  projectRules: '',
  projectRulesDefault: localStorage.getItem('projectRulesDefault') || 'https://raw.githubusercontent.com/mckaywrigley/mckays-app-template/refs/heads/main/.cursorrules',
  starterTemplate: '',
  requestPromptOutput: '',
  specPromptOutput: '',
  plannerPromptOutput: '',
  codeGenPromptOutput: '',
  codeGenPromptType: 'standard',
  openAiApiKey: localStorage.getItem('openAiApiKey'),
  useAiCleaning: false,
};

const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<WizardStep>) => {
      state.currentStep = action.payload;
    },
    setIdea: (state, action: PayloadAction<string>) => {
      state.idea = action.payload;
    },
    setProjectRules: (state, action: PayloadAction<string>) => {
      state.projectRules = action.payload;
    },
    setStarterTemplate: (state, action: PayloadAction<string>) => {
      state.starterTemplate = action.payload;
    },
    setRequestPromptOutput: (state, action: PayloadAction<string>) => {
      state.requestPromptOutput = action.payload;
    },
    setSpecPromptOutput: (state, action: PayloadAction<string>) => {
      state.specPromptOutput = action.payload;
    },
    setPlannerPromptOutput: (state, action: PayloadAction<string>) => {
      state.plannerPromptOutput = action.payload;
    },
    setCodeGenPromptOutput: (state, action: PayloadAction<string>) => {
      state.codeGenPromptOutput = action.payload;
    },
    setCodeGenPromptType: (state, action: PayloadAction<CodeGenPromptType>) => {
      state.codeGenPromptType = action.payload;
    },
    setOpenAiApiKey: (state, action: PayloadAction<string | null>) => {
      state.openAiApiKey = action.payload;
      if (action.payload) {
        localStorage.setItem('openAiApiKey', action.payload);
      } else {
        localStorage.removeItem('openAiApiKey');
      }
    },
    setProjectRulesDefault: (state, action: PayloadAction<string | null>) => {
      state.projectRulesDefault = action.payload;
      if (action.payload) {
        localStorage.setItem('projectRulesDefault', action.payload);
      } else {
        localStorage.removeItem('projectRulesDefault');
      }
    },
    setUseAiCleaning: (state, action: PayloadAction<boolean>) => {
      state.useAiCleaning = action.payload;
    },
    resetWizard: (state) => {
      // Keep the API key and project rules default but reset everything else
      const openAiApiKey = state.openAiApiKey;
      const projectRulesDefault = state.projectRulesDefault;
      Object.assign(state, { ...initialState, openAiApiKey, projectRulesDefault });
    },
  },
});

export const {
  setCurrentStep,
  setIdea,
  setProjectRules,
  setProjectRulesDefault,
  setStarterTemplate,
  setRequestPromptOutput,
  setSpecPromptOutput,
  setPlannerPromptOutput,
  setCodeGenPromptOutput,
  setCodeGenPromptType,
  setOpenAiApiKey,
  setUseAiCleaning,
  resetWizard,
} = wizardSlice.actions;

export default wizardSlice.reducer;