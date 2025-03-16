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
  aiApiKey: localStorage.getItem('aiApiKey'),
  aiEndpoint: localStorage.getItem('aiEndpoint') || 'https://api.openai.com/v1/chat/completions',
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
    setAiApiKey: (state, action: PayloadAction<string | null>) => {
      state.aiApiKey = action.payload;
      if (action.payload) {
        localStorage.setItem('aiApiKey', action.payload);
      } else {
        localStorage.removeItem('aiApiKey');
      }
    },
    setAiEndpoint: (state, action: PayloadAction<string | null>) => {
      state.aiEndpoint = action.payload;
      if (action.payload) {
        localStorage.setItem('aiEndpoint', action.payload);
      } else {
        localStorage.removeItem('aiEndpoint');
        // Reset to default if removed
        state.aiEndpoint = 'https://api.openai.com/v1/chat/completions';
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
    resetWizard: (state) => {
      // Keep the API key, endpoint and project rules default but reset everything else
      const aiApiKey = state.aiApiKey;
      const aiEndpoint = state.aiEndpoint;
      const projectRulesDefault = state.projectRulesDefault;
      Object.assign(state, { ...initialState, aiApiKey, aiEndpoint, projectRulesDefault });
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
  setAiApiKey,
  setAiEndpoint,
  resetWizard,
} = wizardSlice.actions;

export default wizardSlice.reducer;