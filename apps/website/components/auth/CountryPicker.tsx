"use client";

import { useMemo } from "react";
import Select, { type SingleValue } from "react-select";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import ReactCountryFlag from "react-country-flag";

countries.registerLocale(enLocale);

type CountryOption = {
  value: string;
  label: string;
};

type CountryPickerProps = {
  value: string;
  onChange: (countryCode: string, countryName: string) => void;
};

const priorityCountryCodes = [
  "ID",
  "MY",
  "SG",
  "PH",
  "TH",
  "VN",
  "JP",
  "KR",
  "US",
  "GB",
];

export function CountryPicker({ value, onChange }: CountryPickerProps) {
  const options = useMemo(() => {
    const countryNames = countries.getNames("en", { select: "official" });

    const allCountries = Object.entries(countryNames)
      .map(([code, name]) => ({
        value: code,
        label: name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    const priorityCountries = priorityCountryCodes
      .map((code) => allCountries.find((country) => country.value === code))
      .filter(Boolean) as CountryOption[];

    const remainingCountries = allCountries.filter(
      (country) => !priorityCountryCodes.includes(country.value),
    );

    return [...priorityCountries, ...remainingCountries];
  }, []);

  const selectedValue =
    options.find((option) => option.value === value) ?? null;

  function handleChange(option: SingleValue<CountryOption>) {
    onChange(option?.value ?? "", option?.label ?? "");
  }

  return (
    <Select
      instanceId="lifetopia-country-picker"
      options={options}
      value={selectedValue}
      onChange={handleChange}
      placeholder="Choose your country"
      isSearchable
      formatOptionLabel={(option) => (
        <div className="flex items-center gap-2">
          <ReactCountryFlag
            countryCode={option.value}
            svg
            style={{
              width: "1.25em",
              height: "1.25em",
            }}
          />
          <span>{option.label}</span>
        </div>
      )}
      classNames={{
        control: () =>
          "!min-h-0 !rounded-[clamp(0.8rem,1.5vw,1.2rem)] !border !border-[#d9c99f] !bg-white !px-[clamp(0.35rem,0.8vw,0.6rem)] !py-[clamp(0.25rem,0.5vw,0.35rem)] !shadow-none",
        valueContainer: () => "!px-0",
        input: () => "!text-[#2f1b12]",
        singleValue: () => "!text-[#2f1b12]",
        placeholder: () => "!text-[#7a5635]/50",
        menu: () =>
          "!z-50 !rounded-[clamp(0.8rem,1.5vw,1.2rem)] !border !border-[#d9c99f] !bg-white !shadow-xl",
        option: ({ isFocused }) =>
          `!text-[#2f1b12] ${isFocused ? "!bg-[#fff8e8]" : "!bg-white"}`,
      }}
    />
  );
}