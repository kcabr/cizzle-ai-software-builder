/**
 * Settings dialog component
 * Allows users to configure application settings
 */
import { Close, Settings } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  resetWizard,
  setAiApiKey,
  setAiEndpoint,
  setProjectRulesDefault,
  setStarterTemplateDefault,
} from "../../store/wizardSlice";

/**
 * Dialog component for application settings
 */
const SettingsDialog = () => {
  const [open, setOpen] = useState(false);
  const { aiApiKey, aiEndpoint, projectRulesDefault, starterTemplateDefault } =
    useSelector((state: RootState) => state.wizard);
  const [apiKey, setApiKey] = useState(aiApiKey || "");
  const [endpoint, setEndpoint] = useState(
    aiEndpoint || "https://api.openai.com/v1/chat/completions"
  );
  const [rulesDefault, setRulesDefault] = useState(projectRulesDefault || "");
  const [templateDefault, setTemplateDefault] = useState(
    starterTemplateDefault || ""
  );
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    // Reset the form values to current state when opening
    setApiKey(aiApiKey || "");
    setEndpoint(aiEndpoint || "https://api.openai.com/v1/chat/completions");
    setRulesDefault(projectRulesDefault || "");
    setTemplateDefault(starterTemplateDefault || "");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    dispatch(setAiApiKey(apiKey || null));
    dispatch(setAiEndpoint(endpoint || null));
    dispatch(setProjectRulesDefault(rulesDefault || null));
    dispatch(setStarterTemplateDefault(templateDefault || null));
    handleClose();
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all data? This cannot be undone."
      )
    ) {
      dispatch(resetWizard());
      handleClose();
    }
  };

  return (
    <>
      <Button
        startIcon={<Settings />}
        variant="outlined"
        onClick={handleOpen}
        size="small"
      >
        Settings
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Settings
          <IconButton onClick={handleClose} edge="end">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            AI API Key
          </Typography>
          <TextField
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            fullWidth
            margin="normal"
            type="password"
            helperText="Optional: Add your API key to enable AI text cleaning"
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" gutterBottom>
            AI API Endpoint
          </Typography>
          <TextField
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://api.openai.com/v1/chat/completions"
            fullWidth
            margin="normal"
            helperText="URL for the AI API endpoint (defaults to non-reasoning AI Model-compatible chat completions API)"
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" gutterBottom>
            Project Rules Default URL
          </Typography>
          <TextField
            value={rulesDefault}
            onChange={(e) => setRulesDefault(e.target.value)}
            placeholder="https://raw.githubusercontent.com/..."
            fullWidth
            margin="normal"
            helperText="URL to fetch default project rules from (used when creating new projects)"
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" gutterBottom>
            Starter Template Default URL
          </Typography>
          <TextField
            value={templateDefault}
            onChange={(e) => setTemplateDefault(e.target.value)}
            placeholder="https://raw.githubusercontent.com/..."
            fullWidth
            margin="normal"
            helperText="URL to fetch default starter template from (used when creating new projects)"
          />

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Reset Application
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            This will reset all data and return to the first step. This action
            cannot be undone.
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleReset}
            sx={{ mt: 1 }}
          >
            Reset All Data
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SettingsDialog;
