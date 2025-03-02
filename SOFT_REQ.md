Here's the updated project request with the **preferred tech stack** and **details about the wizard steps and token replacement**:

---

# **Project Name**

o1ProTemplateHelper

## **Project Description**

o1ProTemplateHelper is a lightweight, single-session, no-login, no-backend web application designed to facilitate the preparation of large AI-generated code prompts. The application follows a structured, wizard-based workflow, guiding users step-by-step through a series of five predefined static templates. Each template includes tokens that dynamically replace user-provided input from previous steps. The final output at each step is copied to the clipboard for use with ChatGPT-4o Pro.

To ensure a smooth user experience, the application provides a **"Copy to Clipboard"** button, OpenAI token counting for the final output, and local storage support to persist data in case of a page refresh. The UI follows a clean **Material Design theme**, auto-detects dark mode, and minimizes unnecessary manual interactions.

---

## **Target Audience**

- Developers and engineers who need structured AI-generated code prompts.
- AI-assisted software designers working with iterative prompt refinement.
- Users who prefer a lightweight, no-login, single-session workflow for prompt creation.

---

## **Desired Features**

### **Wizard-Based Prompt Construction**

- [ ] Step-by-step workflow using five static templates:
  - [ ] **Request Prompt**
  - [ ] **Spec Prompt**
  - [ ] **Planner Prompt**
  - [ ] **Code Generation Prompt (Standard or Advanced)**
  - [ ] **Code Review Prompt**
- [ ] Each template includes tokens (e.g., `{{TOKEN_NAME}}`), dynamically replaced with user input from prior steps.
- [ ] Users must manually copy and paste AI responses back into the app at each step.
- [ ] Templates are located in the \_Support folder; prompt1.md, prompt2.md, prompt3.md, prompt4a.md, prompt4b.md, prompt5.md

### **Detailed Wizard Steps & Token Replacement**

1. **Define the Web App Idea**

   - User enters their web app idea into a text area.
   - If an OpenAI API key is provided in settings, an **AI-assisted text cleaning** feature is available.
   - AI refines the input text; the user can accept or reject the cleaned version.
   - The entered text will be used to replace the `{{IDEA}}` token in later steps.

2. **Project Rules Input**

   - User enters project rules in a text area.
   - This text is stored and replaces the `{{PROJECT_RULES}}` token in later templates.

3. **Starter Template Code Input**

   - User enters starter template code in a text area.
   - This text is stored and replaces the `{{STARTER_TEMPLATE}}` token in later templates.

4. **Template 1: Request Prompt**

   - The user’s web app idea is inserted into the **Request Prompt** template, replacing the `{{IDEA}}` token.
   - Instructions are provided to **copy the generated text** into ChatGPT-4o.
   - The user iterates on this step until they finalize the **Request Prompt Output**.
   - The finalized text is pasted back into the application.

5. **Template 2: Spec Prompt**

   - The **Request Prompt Output** is inserted into the **Spec Prompt** template, replacing the `{{PROJECT_REQUEST}}` token.
   - Instructions are provided to copy this into ChatGPT-4o Pro.
   - The AI response becomes the **Spec Prompt Output**.
   - The user pastes the **Spec Prompt Output** back into the application.

6. **Template 3: Planner Prompt**

   - The **Spec Prompt Output** is inserted into the **Planner Prompt** template, replacing the `{{TECHNICAL_SPECIFICATION}}` token.
   - Additional replacements include `{{PROJECT_REQUEST}}`, `{{STARTER_TEMPLATE}}`, and `{{PROJECT_RULES}}`.
   - Instructions are provided to copy this into ChatGPT-4o Pro.
   - The AI response becomes the **Planner Prompt Output**.
   - The user pastes the **Planner Prompt Output** back into the application.

7. **Template 4: Code Generation Prompt (User Choice: Standard or Advanced)**

   - The user selects either:
     - **Standard CodeGen Prompt**
     - **Advanced CodeGenXML Prompt**
   - The **Planner Prompt Output** is inserted into the chosen template, replacing the `{{IMPLEMENTATION_PLAN}}` token.
   - Additional replacements include `{{PROJECT_REQUEST}}`, `{{STARTER_TEMPLATE}}`, `{{PROJECT_RULES}}`, and `{{TECHNICAL_SPECIFICATION}}`.
   - Instructions are provided to copy this into ChatGPT-4o Pro to generate the final code output.
   - The user pastes the **CodeGen Prompt Output** back into the application.

8. **Template 5: Code Review Prompt**
   - The **CodeGen Prompt Output** is inserted into the **Review Prompt** template, replacing the `{{EXISTING_CODE}}` token.
   - Additional replacements include `{{IMPLEMENTATION_PLAN}}`, `{{PROJECT_REQUEST}}`, `{{STARTER_TEMPLATE}}`, `{{PROJECT_RULES}}`, and `{{TECHNICAL_SPECIFICATION}}`.

### **Token Input Handling**

- [ ] Token inputs always come from user-entered text in previous wizard steps.
- [ ] Final output areas display text with replaced tokens.

### **Token Counter**

- [ ] Displays OpenAI token count for the final output text area.
- [ ] Token calculation is based on OpenAI's tokenization rules.

### **Session Persistence**

- [ ] Use **localStorage** to retain progress in case of page refresh.
- [ ] No backend or authentication required.

### **User Interface & Experience**

- [ ] Clean **Material Design theme**.
- [ ] **Dark mode auto-detects** system preferences.
- [ ] **Copy to Clipboard** button available on all final output text areas.

---

## **Tech Stack**

- **Frontend:** React.js + TypeScript
- **UI Framework:** Material UI
- **State Management:** Redux
- **API Calls (if needed in the future):** React Query
- **Notifications:** HotToast
- **Build Tooling:** Vite
- **Other:** Standard web development utilities (`react-router`, etc.)

---

## **Design Requests**

- [ ] Minimalist, structured UI with clear visual separation of steps.
- [ ] Support for both **light and dark modes**, with dark mode as default.

---

## **Other Notes**

- No AI configurability—text cleaning is a simple on/off feature if an API key is provided.
- No ability to edit or customize templates—templates are locked.
- No export functionality; all work is expected to be completed within a single session.
