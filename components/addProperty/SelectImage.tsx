"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { IoImageOutline } from "react-icons/io5";

declare global {
  var cloudinary: any;
}

type SelectImageProps = {
  onChange: (value: string) => void;
  value: string;
};

const SelectImage = ({ value, onChange }: SelectImageProps) => {
  const handleCloudinary = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleCloudinary}
      // Unique upload preset from Cloudinary
      uploadPreset="sjryeauh"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            className="relative w-full sm:w-3/4 md:w-1/2 2xl:w-1/3 text-2xl"
            onClick={() => open()}
          >
            <div className="w-full pt-[100%] bg-gray-50 border-[2px] border-dashed border-gray-300 rounded-md flex items-center justify-center text-center text-gray-300 cursor-pointer">
              {value ? (
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  className="rounded-md"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center">
                  <IoImageOutline className="text-4xl" />
                  <p>Click here to upload the photo</p>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default SelectImage;
