/**
 * Starter Template step component
 * Users enter starter template code in this step
 */
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setStarterTemplate } from '../../../store/wizardSlice';
import TextInput from '../../common/TextInput';

/**
 * Component for entering starter template code
 */
const StarterTemplateStep = () => {
  const dispatch = useDispatch();
  const { starterTemplate } = useSelector((state: RootState) => state.wizard);

  const handleChange = (value: string) => {
    dispatch(setStarterTemplate(value));
  };

  return (
    <TextInput
      label="Starter Template Code"
      value={starterTemplate}
      onChange={handleChange}
      placeholder="Enter your starter template code or boilerplate..."
      minRows={12}
      helperText="Provide any starter code, boilerplate, or template structure for your project."
      required={true}
    />
  );
};

export default StarterTemplateStep;