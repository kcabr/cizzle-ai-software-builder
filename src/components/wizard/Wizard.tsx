/**
 * Main Wizard component
 * Manages the wizard flow and renders the current step
 */
import { Box, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import CodeGenPromptStep from "./steps/CodeGenPromptStep";
import FrameworkDocsStep from "./steps/FrameworkDocsStep";
import IdeaStep from "./steps/IdeaStep";
import PlannerPromptStep from "./steps/PlannerPromptStep";
import ProjectRulesStep from "./steps/ProjectRulesStep";
import RequestPromptStep from "./steps/RequestPromptStep";
import SpecPromptStep from "./steps/SpecPromptStep";
import StarterTemplateStep from "./steps/StarterTemplateStep";
import WizardNavigation from "./WizardNavigation";
import SettingsDialog from "../common/SettingsDialog";

/**
 * Component that manages the wizard workflow and renders the appropriate step
 */
const Wizard = () => {
  const { currentStep } = useSelector((state: RootState) => state.wizard);

  // Render the current step based on the step name
  const renderStep = () => {
    switch (currentStep) {
      case "idea":
        return <IdeaStep />;
      case "projectRules":
        return <ProjectRulesStep />;
      case "frameworkDocs":
        return <FrameworkDocsStep />;
      case "starterTemplate":
        return <StarterTemplateStep />;
      case "requestPrompt":
        return <RequestPromptStep />;
      case "specPrompt":
        return <SpecPromptStep />;
      case "plannerPrompt":
        return <PlannerPromptStep />;
      case "codeGenPrompt":
        return <CodeGenPromptStep />;
      default:
        return <Typography>Unknown step</Typography>;
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            Cizzle's AI Software Builder
          </Typography>
          <SettingsDialog />
        </Box>
        <Typography variant="body1" color="text.secondary">
          A step-by-step wizard for preparing structured AI-generated code
          prompts for AI Models.
        </Typography>
      </Paper>

      <WizardNavigation />

      {renderStep()}
    </Box>
  );
};

export default Wizard;
