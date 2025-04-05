/**
 * Framework Documentation step component
 * Users enter app framework documentation in this step (optional)
 */
import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setFrameworkDocs } from "../../../store/wizardSlice";
import TextInput from "../../common/TextInput";

/**
 * Component for entering framework documentation
 */
const FrameworkDocsStep = () => {
  const dispatch = useDispatch();
  const { frameworkDocs } = useSelector((state: RootState) => state.wizard);

  const handleChange = (value: string) => {
    dispatch(setFrameworkDocs(value));
  };

  return (
    <Box>
      <TextInput
        label="App Framework Documentation"
        value={frameworkDocs}
        onChange={handleChange}
        placeholder="Enter documentation about your app's framework..."
        minRows={10}
        helperText="Optional: Provide documentation about your application's framework that will help generate more accurate code."
        required={false}
      />
    </Box>
  );
};

export default FrameworkDocsStep;
