"use client";

type InputProps = {
  type: string;
  disabled?: boolean;
  label: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  validation?: object;
  value: string;
};

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

const Input = ({
  type,
  disabled = false,
  label,
  id,
  register,
  errors,
  validation,
  value,
}: InputProps) => {
  const errorMessage = errors[id]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1 relative z-50">
      <input
        type={type}
        placeholder=" "
        disabled={disabled}
        className={`peer rounded-md disabled:cursor-not-allowed p-6 border-[1px] border-gray-400 ${
          errors[id]
            ? "border-red-600 outline-red-600 focus:border-red-600"
            : "border-black"
        }`}
        id={id}
        {...register(id, validation)}
      />
      <label
        className={`absolute top-6 left-6 ${
          value
            ? "-translate-y-8 text-md bg-white px-3 peer-focus:text-black"
            : "peer-focus:-translate-y-8 peer-focus:text-md  peer-focus:bg-white peer-focus:px-3 text-gray-400"
        } ${errors[id] ? "text-red-600" : ""}`}
      >
        {label}
      </label>
      {errors[id] && <span className="text-red-600">{errorMessage}</span>}
    </div>
  );
};
export default Input;
