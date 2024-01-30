interface InputProps {
  id: string;
  value: string;
  onChange: any;
  label: string;
  type?: string;
  disabled?: boolean;
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
    <div className="w-full relative">
      <input
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        placeholder=" "
        className="peer w-full p-2 bg-white pt-6 border border-black/70 rounded-md outline-none transition disabled:opacity-70"
      />
      <label
        htmlFor={id}
        className="absolute duration-150 transform -translate-y-4 top-5 left-3 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
