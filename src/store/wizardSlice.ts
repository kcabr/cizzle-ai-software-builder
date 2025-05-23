/**
 * Redux slice for managing the wizard state
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CodeGenPromptType, WizardState, WizardStep } from "../types";

const initialState: WizardState = {
  currentStep: "idea",
  idea: "",
  projectRules: "",
  projectRulesDefault:
    import.meta.env.VITE_DEFAULT_PROJECT_RULES_URL || "",
  frameworkDocs: "",
  starterTemplate: "",
  starterTemplateDefault:
    localStorage.getItem("starterTemplateDefault") ||
    import.meta.env.VITE_DEFAULT_STARTER_TEMPLATE_URL ||
    "",
  requestPromptOutput: "",
  specPromptOutput: "",
  plannerPromptOutput: "",
  codeGenPromptOutput: "",
  codeGenPromptType: "standard",
  existingCode: "",
  aiApiKey: localStorage.getItem("aiApiKey"),
  aiEndpoint:
    localStorage.getItem("aiEndpoint") ||
    "https://api.openai.com/v1/chat/completions",
};

const wizardSlice = createSlice({
  name: "wizard",
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
    setProjectRulesDefault: (state, action: PayloadAction<string | null>) => {
      state.projectRulesDefault = action.payload;
      if (action.payload) {
        localStorage.setItem("projectRulesDefault", action.payload);
      } else {
        localStorage.removeItem("projectRulesDefault");
      }
    },
    setFrameworkDocs: (state, action: PayloadAction<string>) => {
      state.frameworkDocs = action.payload;
    },
    setStarterTemplate: (state, action: PayloadAction<string>) => {
      state.starterTemplate = action.payload;
      // Initialize existingCode with starterTemplate when it's first set
      if (!state.existingCode) {
        state.existingCode = action.payload;
      }
    },
    setStarterTemplateDefault: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.starterTemplateDefault = action.payload;
      if (action.payload) {
        localStorage.setItem("starterTemplateDefault", action.payload);
      } else {
        localStorage.removeItem("starterTemplateDefault");
      }
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
    setExistingCode: (state, action: PayloadAction<string>) => {
      state.existingCode = action.payload;
    },
    setCodeGenPromptType: (state, action: PayloadAction<CodeGenPromptType>) => {
      state.codeGenPromptType = action.payload;
    },
    setAiApiKey: (state, action: PayloadAction<string | null>) => {
      state.aiApiKey = action.payload;
      if (action.payload) {
        localStorage.setItem("aiApiKey", action.payload);
      } else {
        localStorage.removeItem("aiApiKey");
      }
    },
    setAiEndpoint: (state, action: PayloadAction<string | null>) => {
      state.aiEndpoint = action.payload;
      if (action.payload) {
        localStorage.setItem("aiEndpoint", action.payload);
      } else {
        localStorage.removeItem("aiEndpoint");
        // Reset to default if removed
        state.aiEndpoint = "https://api.openai.com/v1/chat/completions";
      }
    },
    resetWizard: (state) => {
      // Keep the API key, endpoint, project rules default, and starter template default but reset everything else
      const aiApiKey = state.aiApiKey;
      const aiEndpoint = state.aiEndpoint;
      const projectRulesDefault = state.projectRulesDefault;
      const starterTemplateDefault = state.starterTemplateDefault;
      Object.assign(state, {
        ...initialState,
        aiApiKey,
        aiEndpoint,
        projectRulesDefault,
        starterTemplateDefault,
      });
    },
    // New reducers for local storage functionality
    loadSavedState: (state) => {
      try {
        const savedState = localStorage.getItem("wizardState");
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          // Maintain sensible defaults for missing values
          return {
            ...parsedState,
            aiApiKey: parsedState.aiApiKey || localStorage.getItem("aiApiKey"),
            aiEndpoint: parsedState.aiEndpoint || 
              localStorage.getItem("aiEndpoint") || 
              "https://api.openai.com/v1/chat/completions",
            projectRulesDefault: parsedState.projectRulesDefault || 
              import.meta.env.VITE_DEFAULT_PROJECT_RULES_URL || "",
            starterTemplateDefault: parsedState.starterTemplateDefault || 
              localStorage.getItem("starterTemplateDefault") || 
              import.meta.env.VITE_DEFAULT_STARTER_TEMPLATE_URL || "",
          };
        }
      } catch (error) {
        console.error("Error loading state from localStorage:", error);
      }
      return state;
    },
    resetWizardAndSavedState: (state) => {
      // Clear localStorage except for API key and endpoint
      localStorage.removeItem("wizardState");
      
      // Keep the API key, endpoint, project rules default, and starter template default but reset everything else
      const aiApiKey = state.aiApiKey;
      const aiEndpoint = state.aiEndpoint;
      const projectRulesDefault = state.projectRulesDefault;
      const starterTemplateDefault = state.starterTemplateDefault;
      
      // Reset to initial state
      Object.assign(state, {
        ...initialState,
        aiApiKey,
        aiEndpoint,
        projectRulesDefault,
        starterTemplateDefault,
      });
    },
  },
});

export const {
  setCurrentStep,
  setIdea,
  setProjectRules,
  setProjectRulesDefault,
  setFrameworkDocs,
  setStarterTemplate,
  setStarterTemplateDefault,
  setRequestPromptOutput,
  setSpecPromptOutput,
  setPlannerPromptOutput,
  setCodeGenPromptOutput,
  setExistingCode,
  setCodeGenPromptType,
  setAiApiKey,
  setAiEndpoint,
  resetWizard,
  loadSavedState,
  resetWizardAndSavedState,
} = wizardSlice.actions;

export default wizardSlice.reducer;
