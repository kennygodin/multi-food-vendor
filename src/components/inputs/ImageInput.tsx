'use client';

import axios from 'axios';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import Avatar from '../Avatar';

interface ImageInputProps {
  link: string | null;
  setLink: (value: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ link, setLink }) => {
  const handleImageChange = useCallback(
    async (e: any) => {
      const image = e.target.files[0];
      const formData = new FormData();

      formData.append('file', image);
      formData.append('upload_preset', 'multi-food-vendor');

      try {
        const imageUploadPromise = new Promise(async (resolve, reject) => {
          const res = await axios.post(
            'https://api.cloudinary.com/v1_1/kencodin/image/upload',
            formData
          );

          const imageLink = res.data?.secure_url;
          if (imageLink) {
            setLink(imageLink);
            resolve(imageLink);
          } else {
            reject();
          }

          toast.promise(imageUploadPromise, {
            loading: 'Uploading image',
            success: 'Image uploaded',
            error: 'Something went wrong!',
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    [setLink]
  );
  return (
    <>
      <Avatar image={link} tab />
      <label className="flex items-center justify-center">
        <input type="file" className="hidden" onChange={handleImageChange} />
        <span className="bg-white border-black rounded-lg text-black p-1 text-sm font-light  hover:opacity-80 transition w-full border cursor-pointer text-center">
          Edit image
        </span>
      </label>
    </>
  );
};

export default ImageInput;
