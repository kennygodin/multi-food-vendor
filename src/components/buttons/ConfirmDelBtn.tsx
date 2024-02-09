// ConfirmDelBtn.tsx

import { useState } from 'react';
import Button from './Button';

interface ConfirmDelBtnProps {
  label: string;
  onDelete: () => void;
}

const ConfirmDelBtn: React.FC<ConfirmDelBtnProps> = ({ label, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="relative">
      <Button
        onClick={() => setShowConfirm(true)}
        label={label}
        addBtn
        outline
      />

      {showConfirm && (
        <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center z-50">
          <div className="bg-white p-10 rounded-lg">
            <div>Are you sure you want to delete?</div>
            <div className="flex gap-3 mt-2">
              <Button
                label="Cancel"
                outline
                onClick={() => setShowConfirm(false)}
              />
              <Button
                label="Yes, Delete"
                onClick={() => {
                  onDelete();
                  setShowConfirm(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmDelBtn;
