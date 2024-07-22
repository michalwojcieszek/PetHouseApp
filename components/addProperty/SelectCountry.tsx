"use client";

import { countriesFormatted } from "@/utils/countries";
import dynamic from "next/dynamic";
// import Select from "react-select";
const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

export type CountryType = {
  code: string;
  name: string;
  flag: string;
};

type SelectCountryProps = {
  value?: CountryType;
  onChange: (value: CountryType) => void;
  disabled?: boolean;
};

const SelectCountry = ({ value, onChange, disabled }: SelectCountryProps) => {
  return (
    <DynamicSelect
      placeholder="No country selected"
      isClearable
      options={countriesFormatted}
      onChange={(value) => {
        onChange(value as CountryType);
      }}
      aria-labelledby={`${value}-label`}
      value={value}
      getOptionLabel={(option: any) => option.name}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row gap-2 items-center cursor-pointer">
          <div className="">{option.flag}</div>
          <div>{option.name}</div>
        </div>
      )}
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#a3ffb4",
        },
      })}
      isDisabled={disabled}
      classNamePrefix="react-select"
      className="react-select-container"
      controlShouldRenderValue={true}
    />
  );
};
export default SelectCountry;
