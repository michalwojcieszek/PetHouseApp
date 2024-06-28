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
};

const SelectCountry = ({ value, onChange }: SelectCountryProps) => {
  return (
    <Select
      placeholder="No country selected"
      options={countriesFormatted}
      onChange={(value) => onChange(value)}
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row gap-2">
          <div>{option.flag}</div>
          <div>{option.name}</div>
        </div>
      )}
    />
  );
};
export default SelectCountry;
