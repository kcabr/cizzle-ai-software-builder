/**
 * Prompt output component with copy button and token counter
 */
import { Box, Paper, TextField, Typography } from "@mui/material";
import CopyButton from "./CopyButton";
import TokenCounter from "./TokenCounter";
import { codeTextStyles } from "../../utils/textStyles";

interface PromptOutputProps {
  value: string;
  title: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  minRows?: number;
  maxRows?: number;
}

/**
 * Component that displays prompt output with copy button and token counter
 */
const PromptOutput = ({
  value,
  title,
  readOnly = true,
  onChange,
  minRows = 10,
  maxRows = 20,
}: PromptOutputProps) => {
  return (
    <Paper elevation={0} variant="outlined" sx={{ p: 2, mb: 3 }}>
      {/* <Typography variant="h6" gutterBottom>
        {title}
      </Typography> */}

      <TextField
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        multiline
        minRows={minRows}
        maxRows={maxRows}
        fullWidth
        variant="outlined"
        sx={{ mb: 2, ...codeTextStyles }}
        InputProps={{
          readOnly,
        }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <CopyButton text={value} disabled={!value} />
      </Box>
    </Paper>
  );
};

export default PromptOutput;
