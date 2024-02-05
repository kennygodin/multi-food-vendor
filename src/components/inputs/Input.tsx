interface InputProps {
  id: string;
  value: string | number;
  onChange: any;
  label: string;
  type?: string;
  disabled?: boolean;
  tab?: boolean;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <input
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        placeholder={label}
        className="w-full p-2 bg-white border border-black/70 rounded-md outline-none  disabled:opacity-70"
      />
    </div>
  );
};

export default Input;
