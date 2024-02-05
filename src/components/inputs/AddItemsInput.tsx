import Button from '../buttons/Button';
import Input from './Input';

interface AddItemsInputProps {
  inputName: string;
  onChange: () => void;
  updateMode: string;
  onClick: () => void;
}

const AddItemsInput: React.FC<AddItemsInputProps> = ({
  inputName,
  onChange,
  updateMode,
  onClick,
}) => {
  return (
    <div className="flex gap-3">
      <Input
        id="category"
        value={inputName}
        onChange={(e: any) => onChange}
        label="Enter a category"
      />
      <Button label={updateMode ? 'Update' : 'Add'} addBtn onClick={onClick} />
    </div>
  );
};

export default AddItemsInput;
