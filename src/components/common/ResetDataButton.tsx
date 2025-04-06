/**
 * Reset Data Button component
 * Provides functionality to reset all wizard data with confirmation
 */
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { RestartAlt } from "@mui/icons-material";
import { useLocalStorageSave } from "../../hooks/useLocalStorageSave";

/**
 * Component that displays a button to reset all wizard data
 * with confirmation dialogs to prevent accidental reset
 */
const ResetDataButton = () => {
  const { resetAllData } = useLocalStorageSave();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSecondConfirmOpen, setIsSecondConfirmOpen] = useState(false);

  const handleClickOpen = () => {
    setIsConfirmOpen(true);
  };

  const handleClose = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirm = () => {
    setIsConfirmOpen(false);
    setIsSecondConfirmOpen(true);
  };

  const handleSecondClose = () => {
    setIsSecondConfirmOpen(false);
  };

  const handleSecondConfirm = () => {
    setIsSecondConfirmOpen(false);
    resetAllData();
  };

  return (
    <>
      <Button
        variant="outlined"
        color="warning"
        startIcon={<RestartAlt />}
        onClick={handleClickOpen}
        sx={{ mx: 1 }}
      >
        Reset Data
      </Button>

      {/* First confirmation dialog */}
      <Dialog
        open={isConfirmOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Reset All Data?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reset all wizard data? This will clear all your progress and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleConfirm} color="warning" autoFocus>
            Yes, I'm Sure
          </Button>
        </DialogActions>
      </Dialog>

      {/* Second confirmation dialog */}
      <Dialog
        open={isSecondConfirmOpen}
        onClose={handleSecondClose}
        aria-labelledby="second-alert-dialog-title"
        aria-describedby="second-alert-dialog-description"
      >
        <DialogTitle id="second-alert-dialog-title">
          Are You Absolutely Sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="second-alert-dialog-description">
            This is your final warning. All your work will be permanently deleted. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSecondClose} color="primary">Cancel</Button>
          <Button onClick={handleSecondConfirm} color="error" autoFocus>
            Yes, Delete Everything
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ResetDataButton;