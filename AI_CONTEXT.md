# Cizzle's AI Software Builder - AI Context

## Project Overview

This is a React + TypeScript web application called "Cizzle's AI Software Builder" designed to guide users through creating structured prompts for AI code generation with ChatGPT-4o Pro. The application implements a wizard-based workflow that progressively helps users build complex prompts with contextual data carried through multiple steps.

## Architecture and Technology Stack

### Core Technologies

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux with Redux Toolkit
- **UI Framework**: Material UI (MUI) v6
- **API Integration**: React Query (TanStack Query)
- **Routing**: React Router v7
- **Notifications**: React Hot Toast
- **Token Counting**: gpt-tokenizer

### Project Structure

```
src/
├── App.tsx                  # Root application component
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── CopyButton.tsx   # Button for copying text to clipboard
│   │   ├── PromptOutput.tsx # Component to display generated prompts
│   │   ├── SettingsDialog.tsx # Configuration dialog
│   │   ├── TextInput.tsx    # Text input component
│   │   └── TokenCounter.tsx # Displays token count for prompts
│   └── wizard/              # Wizard-specific components
│       ├── Wizard.tsx       # Main wizard container
│       ├── WizardNavigation.tsx # Navigation between wizard steps
│       └── steps/           # Individual wizard step components
│           ├── CodeGenPromptStep.tsx
│           ├── IdeaStep.tsx
│           ├── PlannerPromptStep.tsx
│           ├── ProjectRulesStep.tsx
│           ├── RequestPromptStep.tsx
│           ├── ReviewPromptStep.tsx
│           ├── SpecPromptStep.tsx
│           └── StarterTemplateStep.tsx
├── hooks/                   # Custom React hooks
│   ├── useTemplateData.ts   # Manages template data and token replacement
│   └── useWizardNavigation.ts # Controls wizard navigation flow
├── layouts/
│   └── MainLayout.tsx       # Main application layout
├── services/
│   └── openaiService.ts     # OpenAI API integration
├── store/                   # Redux store
│   ├── index.ts             # Store configuration
│   └── wizardSlice.ts       # Main state slice
├── types/
│   └── index.ts             # TypeScript type definitions
└── utils/
    ├── clipboardUtils.ts    # Clipboard utilities
    └── promptUtils.ts       # Prompt generation utilities
```

## Application Flow and State Management

### Wizard Steps Sequence

1. **Idea Step**: User inputs their web app idea
2. **Project Rules Step**: User defines project requirements and constraints
3. **Starter Template Step**: User selects or specifies a starter template
4. **Request Prompt Step**: Generate initial request prompt
5. **Spec Prompt Step**: Generate detailed specification prompt
6. **Planner Prompt Step**: Generate planning prompt
7. **Code Generation Prompt Step**: Generate code implementation prompt
8. **Review Prompt Step**: Generate review and improvement prompt

### State Management

The application uses Redux with a primary `wizardSlice` that maintains:

- Current wizard step index
- User inputs at each step
- Generated prompt outputs
- Application settings (OpenAI API key, AI cleaning toggle)

State persistence is implemented using localStorage to retain user progress across sessions.

## Key Features

### Prompt Template System

- Templates are stored in `_Support` directory as markdown files
- Templates use token placeholders (e.g., `{{IDEA}}`, `{{PROJECT_RULES}}`)
- The `replaceTokens` utility dynamically substitutes these tokens with user-provided content
- Each step builds on context from previous steps

### Token Counting and Management

- Real-time token counting using `gpt-tokenizer`
- Visual feedback when approaching or exceeding token limits
- Helps users optimize prompts for the OpenAI context window

### Copy to Clipboard Functionality

- Each generated prompt has a "Copy to Clipboard" button
- Facilitates easy transfer of prompts to ChatGPT-4o

### AI-Assisted Text Cleaning

- Optional feature to clean and format user inputs
- Uses OpenAI API if a key is provided in settings
- Can be toggled on/off based on user preference

### Settings Management

- OpenAI API key configuration
- Toggle for AI-assisted cleaning
- Persistent settings using localStorage

## Implementation Notes

### Prompt Generation Workflow

1. User provides initial inputs (idea, rules, template)
2. At each step, templates are loaded and tokens are replaced with user data
3. User copies the processed template to ChatGPT-4o
4. User pastes ChatGPT's response back into the application
5. This response becomes input for the next template in the sequence

### Data Flow

- Previous step outputs are used as inputs for subsequent steps
- The application maintains context throughout the wizard flow
- Each prompt builds on the accumulated context from earlier steps

### External Dependencies

- The system is designed to work with ChatGPT-4o Pro
- Optional OpenAI API integration for enhanced functionality
- No backend dependencies; operates fully on the client side

## Purpose and Target Users

This application is a specialized tool for structured prompt creation, designed for developers wanting to generate high-quality code using AI assistants like ChatGPT-4o Pro. It emphasizes a methodical, step-by-step approach to prompt engineering that builds context progressively.
