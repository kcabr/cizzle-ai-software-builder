/**
 * Settings dialog component
 * Allows users to configure application settings
 */
import { Close, Settings } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { resetWizard, setOpenAiApiKey } from '../../store/wizardSlice';

/**
 * Dialog component for application settings
 */
const SettingsDialog = () => {
  const [open, setOpen] = useState(false);
  const { openAiApiKey } = useSelector((state: RootState) => state.wizard);
  const [apiKey, setApiKey] = useState(openAiApiKey || '');
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    dispatch(setOpenAiApiKey(apiKey || null));
    handleClose();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
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
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Settings
          <IconButton onClick={handleClose} edge="end">
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Typography variant="subtitle1" gutterBottom>
            OpenAI API Key
          </Typography>
          <TextField
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            fullWidth
            margin="normal"
            type="password"
            helperText="Optional: Add your OpenAI API key to enable AI text cleaning"
          />

          <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
            Reset Application
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            This will reset all data and return to the first step. This action cannot be undone.
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