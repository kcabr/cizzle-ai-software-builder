/**
 * Project Rules step component
 * Users enter project rules in this step
 */
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setProjectRules } from "../../../store/wizardSlice";
import TextInput from "../../common/TextInput";

/**
 * Component for entering project rules
 */
const ProjectRulesStep = () => {
  const dispatch = useDispatch();
  const { projectRules, projectRulesDefault } = useSelector(
    (state: RootState) => state.wizard
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (value: string) => {
    dispatch(setProjectRules(value));
  };

  console.log("projectRulesDefault", projectRulesDefault);

  const fetchDefaultRules = async () => {
    if (!projectRulesDefault) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(projectRulesDefault);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch default rules: ${response.statusText}`
        );
      }

      const text = await response.text();
      dispatch(setProjectRules(text));
    } catch (err) {
      console.error("Error fetching default rules:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load default rules"
      );
    } finally {
      setLoading(false);
    }
  };

  // Add useEffect to auto-load default rules if project rules are empty
  useEffect(() => {
    if (!projectRules && projectRulesDefault && !loading && !error) {
      fetchDefaultRules();
    }
  }, [projectRules, projectRulesDefault]);

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextInput
        label="Project Rules"
        value={projectRules}
        onChange={handleChange}
        placeholder="Enter your project rules and requirements..."
        minRows={8}
        helperText="Provide any specific rules, constraints, or requirements for your project."
        required={true}
      />

      {projectRulesDefault && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={fetchDefaultRules}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : null}
          >
            {loading ? "Loading..." : "Load Default Rules"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProjectRulesStep;
