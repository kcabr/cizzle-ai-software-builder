/**
 * Project Rules step component
 * Users enter project rules in this step
 */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setProjectRules } from '../../../store/wizardSlice';
import TextInput from '../../common/TextInput';

/**
 * Component for entering project rules
 */
const ProjectRulesStep = () => {
  const dispatch = useDispatch();
  const { projectRules } = useSelector((state: RootState) => state.wizard);

  const handleChange = (value: string) => {
    dispatch(setProjectRules(value));
  };

  return (
    <TextInput
      label="Project Rules"
      value={projectRules}
      onChange={handleChange}
      placeholder="Enter your project rules and requirements..."
      minRows={8}
      helperText="Provide any specific rules, constraints, or requirements for your project."
      required={true}
    />
  );
};

export default ProjectRulesStep;