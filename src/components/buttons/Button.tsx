'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  addBtn?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  addBtn,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-lg
    hover:opacity-80
    transition
    
    border
    ${outline ? 'bg-white' : 'bg-green-500'}
    ${outline ? 'border-black' : 'border-white'}
    ${outline ? 'text-black' : 'text-white'}
    ${small ? 'py-1' : 'py-2'}
    ${small ? 'text-sm' : 'text-base'}
    ${small ? 'font-light' : 'font-semibold'}
    ${addBtn ? '' : 'w-full'}
    ${addBtn ? 'px-4' : ''}
  `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-2" />}
      {label}
    </button>
  );
};

export default Button;
