/**
 * Idea step component
 * First step in the wizard where users enter their web app idea
 */
import { Button, CircularProgress, FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { RootState } from '../../../store';
import { setIdea, setUseAiCleaning } from '../../../store/wizardSlice';
import { cleanTextWithAI } from '../../../services/openaiService';
import TextInput from '../../common/TextInput';

/**
 * Component for the first wizard step: Web App Idea entry
 */
const IdeaStep = () => {
  const dispatch = useDispatch();
  const { idea, openAiApiKey, useAiCleaning } = useSelector((state: RootState) => state.wizard);
  const [localIdea, setLocalIdea] = useState(idea);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (value: string) => {
    setLocalIdea(value);
    dispatch(setIdea(value));
  };

  const handleAiCleaningToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUseAiCleaning(event.target.checked));
  };

  const handleAiCleaning = async () => {
    if (!openAiApiKey) {
      toast.error('Please add an OpenAI API key in the settings to use AI cleaning');
      return;
    }

    if (!localIdea.trim()) {
      toast.error('Please enter an idea to clean');
      return;
    }

    setIsProcessing(true);
    try {
      const cleanedText = await cleanTextWithAI(localIdea, openAiApiKey);
      setLocalIdea(cleanedText);
      dispatch(setIdea(cleanedText));
      toast.success('Text cleaned successfully');
    } catch (error) {
      toast.error('Failed to clean text. Check your API key and try again.');
      console.error('AI cleaning error:', error);
    } finally {
      setIsProcessing(false);
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

      {openAiApiKey && (
        <>
          <FormControlLabel
            control={
              <Switch
                checked={useAiCleaning}
                onChange={handleAiCleaningToggle}
                color="primary"
              />
            }
            label="Enable AI text cleaning"
          />

          {useAiCleaning && (
            <Button
              onClick={handleAiCleaning}
              disabled={isProcessing || !localIdea.trim()}
              sx={{ mt: 1, mb: 3 }}
              variant="outlined"
            >
              {isProcessing ? <CircularProgress size={24} /> : 'Clean Text with AI'}
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default IdeaStep;