"use client";

import { countriesFormatted } from "@/utils/countries";
import Select from "react-select";

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
    <div className="">
      <Select
        placeholder="No country selected"
        isClearable
        options={countriesFormatted}
        onChange={(value) => {
          console.log(value);
          onChange(value);
        }}
        value={value}
        getOptionLabel={(option) => option.name}
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
      />
    </div>
  );
};
export default SelectCountry;
