import countries from "world-countries";

export const countriesFormatted = countries.map((country) => ({
  code: country.cca2,
  name: country.name.common,
  flag: country.flag,
}));

export const findCountryByCode = (codeInput: string) => {
  return countriesFormatted.find((country) => country.code === codeInput);
};
