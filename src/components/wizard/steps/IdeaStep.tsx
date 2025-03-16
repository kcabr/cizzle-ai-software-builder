/**
 * Idea step component
 * First step in the wizard where users enter their web app idea
 */
import {
  Button,
  CircularProgress,
  Stack
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { RootState } from "../../../store";
import { setIdea } from "../../../store/wizardSlice";
import { cleanTextWithAI } from "../../../services/aiService";
import TextInput from "../../common/TextInput";

/**
 * Component for the first wizard step: Web App Idea entry
 */
const IdeaStep = () => {
  const dispatch = useDispatch();
  const { idea, aiApiKey, aiEndpoint } = useSelector(
    (state: RootState) => state.wizard
  );
  const [localIdea, setLocalIdea] = useState(idea);
  const [originalIdea, setOriginalIdea] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [textChanged, setTextChanged] = useState(false);
  const [punchupApplied, setPunchupApplied] = useState(false);

  useEffect(() => {
    // Track if text has changed since last AI punch-up
    if (punchupApplied && localIdea !== originalIdea) {
      setTextChanged(true);
    }
  }, [localIdea, originalIdea, punchupApplied]);

  const handleChange = (value: string) => {
    setLocalIdea(value);
    dispatch(setIdea(value));
  };

  const handleAiCleaning = async () => {
    if (!aiApiKey) {
      toast.error("Please add an API key in the settings to use AI cleaning");
      return;
    }

    if (!localIdea.trim()) {
      toast.error("Please enter an idea to clean");
      return;
    }

    // Save original text for undo functionality
    setOriginalIdea(localIdea);
    setIsProcessing(true);
    
    try {
      const cleanedText = await cleanTextWithAI(
        localIdea,
        aiApiKey,
        aiEndpoint || "https://api.openai.com/v1/chat/completions"
      );
      setLocalIdea(cleanedText);
      dispatch(setIdea(cleanedText));
      toast.success("Text cleaned successfully");
      setPunchupApplied(true);
      setTextChanged(false);
    } catch (error) {
      toast.error(
        "Failed to clean text. Check your API key and endpoint settings."
      );
      console.error("AI cleaning error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUndo = () => {
    if (originalIdea) {
      setLocalIdea(originalIdea);
      dispatch(setIdea(originalIdea));
      toast.success("Reverted to original text");
      setPunchupApplied(false);
    }
  };

  return (
    <>
      <TextInput
        label="Define Your Web App Idea"
        value={localIdea}
        onChange={handleChange}
        placeholder="Describe your web app idea in detail..."
        minRows={6}
        helperText="Enter a clear description of your web app idea. The more detailed, the better."
        required={true}
      />

      {aiApiKey && (
        <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 3 }}>
          <Button
            onClick={handleAiCleaning}
            disabled={isProcessing || !localIdea.trim() || (punchupApplied && !textChanged)}
            variant="outlined"
          >
            {isProcessing ? <CircularProgress size={24} /> : "AI Punch-up"}
          </Button>
          
          {punchupApplied && (
            <Button
              onClick={handleUndo}
              disabled={isProcessing}
              variant="outlined"
              color="secondary"
            >
              Undo Punch-up
            </Button>
          )}
        </Stack>
      )}
    </>
  );
};

export default IdeaStep;
