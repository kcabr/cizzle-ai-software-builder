/**
 * Starter Template step component
 * Users enter starter template code in this step
 */
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setStarterTemplate } from "../../../store/wizardSlice";
import TextInput from "../../common/TextInput";

/**
 * Component for entering starter template code
 */
const StarterTemplateStep = () => {
  const dispatch = useDispatch();
  const { starterTemplate, starterTemplateDefault } = useSelector(
    (state: RootState) => state.wizard
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string) => {
    dispatch(setStarterTemplate(value));
  };

  const fetchDefaultTemplate = async () => {
    if (!starterTemplateDefault) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(starterTemplateDefault);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch default template: ${response.statusText}`
        );
      }

      const text = await response.text();
      dispatch(setStarterTemplate(text));
    } catch (err) {
      console.error("Error fetching default template:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load default template"
      );
    } finally {
      setLoading(false);
    }
  };

  // Add useEffect to auto-load default template if starter template is empty
  useEffect(() => {
    if (!starterTemplate && starterTemplateDefault && !loading && !error) {
      fetchDefaultTemplate();
    }
  }, [starterTemplate, starterTemplateDefault]);

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextInput
        label="Starter Template Code"
        value={starterTemplate}
        onChange={handleChange}
        placeholder="Enter your starter template code or boilerplate..."
        minRows={12}
        helperText="Provide any starter code, boilerplate, or template structure for your project."
        required={true}
      />

      {starterTemplateDefault && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={fetchDefaultTemplate}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {loading ? "Loading..." : "Load Default Template"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default StarterTemplateStep;
