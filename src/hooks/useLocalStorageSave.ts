/**
 * Custom hook for saving form data to local storage
 * Implements auto-save functionality on blur events
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { RootState } from "../store";
import { loadSavedState, resetWizardAndSavedState } from "../store/wizardSlice";

/**
 * A hook that provides local storage functionality for the wizard
 * - Loads saved state on component mount
 * - Provides methods to reset the saved state
 * 
 * @returns Object with reset functions
 */
export const useLocalStorageSave = () => {
  const dispatch = useDispatch();
  const wizardState = useSelector((state: RootState) => state.wizard);

  // Load saved state from local storage on component mount
  useEffect(() => {
    dispatch(loadSavedState());
  }, [dispatch]);

  // Save state to local storage whenever wizard state changes
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      const stateToSave = { ...wizardState };
      localStorage.setItem("wizardState", JSON.stringify(stateToSave));
    }, 500); // Debounce saves to avoid excessive writes

    return () => {
      clearTimeout(saveTimeout);
    };
  }, [wizardState]);

  /**
   * Resets the wizard state and clears local storage data
   * with double confirmation
   */
  const resetAllData = () => {
    const firstConfirmation = window.confirm(
      "Are you sure you want to reset all wizard data? This action cannot be undone."
    );

    if (firstConfirmation) {
      const secondConfirmation = window.confirm(
        "Are you absolutely sure? All your data will be lost."
      );

      if (secondConfirmation) {
        dispatch(resetWizardAndSavedState());
        toast.success("All data has been reset");
      }
    }
  };

  return {
    resetAllData,
  };
};