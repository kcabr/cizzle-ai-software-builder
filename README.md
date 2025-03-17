# Cizzle's AI Software Builder

A step-by-step wizard application for creating structured prompts for AI code generation. This tool guides you through the process of building comprehensive, context-rich prompts to generate high-quality code with non-reasoning AI models.

## Features

- **Wizard-Based Workflow**: Navigate through a structured series of steps, with each step building upon previous inputs
- **Token-Based Templates**: Automated insertion of your inputs into pre-defined prompt templates
- **Token Counting**: Real-time tracking of token usage for AI model compatibility
- **Copy to Clipboard**: Easy copying of generated prompts
- **Dark/Light Mode**: Automatic theme detection based on system preferences
- **Session Persistence**: Local storage saves your progress if you refresh the page

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/cizzle-ai-software-builder.git
   cd cizzle-ai-software-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The output will be in the `dist` directory, ready to be deployed to your hosting service.

## How to Use

### Step 1: Define Your Web App Idea

- Enter a detailed description of the web application you want to build
- Be specific about features, functionalities, and design preferences

### Step 2: Set Project Rules

- Define constraints, requirements, and guidelines for your project
- Include technology preferences, coding standards, and architectural decisions

### Step 3: Starter Template

- Provide a basic starter template or boilerplate code if applicable
- Leave empty if you're starting from scratch

### Step 4: Request Prompt

- The system generates a structured request prompt with your idea inserted
- Copy this prompt to a non-reasoning AI Model
- Iterate with the AI until you have a satisfactory response
- Paste the AI's response back into the application

### Step 5: Technical Specifications

- The system generates a technical specifications prompt with your previous outputs inserted
- Copy this prompt to a REASONING AI Model with a Large Context Window
- Paste the AI's response back into the application

### Step 6: Planner Prompt

- The system generates a planning prompt incorporating previous inputs and outputs
- Copy this prompt to a REASONING AI Model with a Large Context Window
- Paste the AI's response back into the application

### Step 7: Code Generation

- Choose between standard or advanced (XML) code generation format
- The system generates a code implementation prompt with all previous context
- Copy this prompt to a REASONING AI Model with a Large Context Window
- Add the generated code files to your project; bugfix / tweak
- Repomix your codebase (text all in one file) and replace the Current Code input with your latest code; do this for each planner step
- Check off planner step within the prompt text (- [ ] turns to - [x]); This tells the Code Generation prompt to skip this step next time; Re-add it to the code section; Rinse / Repeat for each step

### Step 8: Review Prompt

- The final step generates a review prompt that includes all your code and context
- Use this prompt to get feedback and improvements on your generated code

## Advanced Features

### Settings

- Access settings by clicking the "Settings" button in the top-right corner
- **AI API Key**: Optionally add your API key to enable AI-assisted text cleaning
- **AI API Endpoint**: Configure the AI API endpoint URL
- **Project Rules Default URL**: Set a default URL for fetching project rules

### AI Text Cleaning

If you've provided an API key in settings, you can use the AI-assisted text cleaning feature to refine your inputs.

## Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React, TypeScript, and Material UI
- Uses Redux for state management
- Developed to streamline the AI-assisted software development process
