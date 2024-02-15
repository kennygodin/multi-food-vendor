import ImageInput from '../inputs/ImageInput';
import Input from '../inputs/Input';
import { Category } from '@prisma/client';
import Button from '../buttons/Button';
import React from 'react';

interface MenuInputProps {
  image: string | null;
  menuItemName: string;
  description: string;
  price: number | null;
  selectedOption: string;
  setImage: (value: string) => void;
  setMenuItemName: (value: string) => void;
  setDescription: (value: string) => void;
  setPrice: (value: number | null) => void;
  setSelectedOption: (value: string) => void;
  categories: Category[];
  setAddedMode?: () => void;
  onSubmit: () => void;
  label: string;
}

const MenuInput: React.FC<MenuInputProps> = ({
  image,
  setImage,
  menuItemName,
  description,
  price,
  setMenuItemName,
  setDescription,
  setPrice,
  selectedOption,
  setSelectedOption,
  categories,
  setAddedMode,
  onSubmit,
  label,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-3 mb-2">
      <div className="flex flex-col gap-1">
        <ImageInput link={image} setLink={setImage} />
        <span
          className="mt-3 bg-white border-black rounded-lg text-black p-1 text-sm font-light  hover:opacity-80 transition w-full border cursor-pointer text-center"
          onClick={setAddedMode}
        >
          All items
        </span>
      </div>
      <div className="w-full md:grow flex flex-col gap-3">
        <Input
          id="menuItemName"
          value={menuItemName}
          onChange={(e: any) => setMenuItemName(e.target.value)}
          label="Menu name"
        />
        <Input
          id="description"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
          label="Short description of menu"
        />
        <Input
          id="price"
          value={price === null ? '' : String(price)}
          onChange={(e: any) => {
            const inputValue = e.target.value;
            setPrice(inputValue === '' ? null : parseInt(inputValue, 10));
          }}
          label="Menu price"
        />

        <select
          className="p-2 rounded-md"
          id="category"
          value={selectedOption}
          onChange={(e: any) => setSelectedOption(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((cat: Category) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <Button label={label} addBtn onClick={onSubmit} />
      </div>
    </div>
  );
};

export default MenuInput;
