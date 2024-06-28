"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../Input";
import Map from "../map/Map";
import { SetStateAction, useEffect, useState } from "react";
import { IoMapOutline } from "react-icons/io5";
import SelectCountry, { CountryType } from "./SelectCountry";

type AddPropertyLocationType = {
  register: UseFormRegister<FieldValues>;
  setCustomValue: (id: string, value: any) => void;
  errors: FieldErrors<FieldValues>;
  isLoading: boolean;
  street: string;
  zipcode: string;
  city: string;
  state: CountryType;
  setCords: React.Dispatch<SetStateAction<null>>;
  cords: {
    lat: number;
    lng: number;
  } | null;
};

const AddPropertyLocation = ({
  register,
  setCustomValue,
  errors,
  isLoading,
  street,
  zipcode,
  city,
  state,
  setCords,
  cords,
}: AddPropertyLocationType) => {
  const [isMapLoading, setIsMapLoading] = useState(false);

  useEffect(() => {
    if (street && zipcode && city && state) {
      console.log(street, zipcode, city, state);
      console.log(process.env.GOOGLE_GEOCODING_API);
      const getCords = async () => {
        setIsMapLoading(true);
        const coordinatesString = `${street},${zipcode},${city},${state}`;
        console.log(coordinatesString);
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${coordinatesString}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API}`
        );
        const data = await res.json();
        setCords(data.results[0].geometry.location);
        setIsMapLoading(false);
      };
      getCords();
    }
  }, [street, zipcode, city, state]);

  return (
    <>
      <Input
        id="street"
        type="text"
        label="Street"
        register={register}
        errors={errors}
        validation={{ required: "Street is required" }}
        disabled={isLoading}
        value={street}
      />
      <Input
        id="zipcode"
        type="text"
        label="Zip code"
        register={register}
        errors={errors}
        validation={{ required: "Zip code is required" }}
        disabled={isLoading}
        value={zipcode}
      />
      <Input
        id="city"
        type="text"
        label="City"
        register={register}
        errors={errors}
        validation={{ required: "City is required" }}
        disabled={isLoading}
        value={city}
      />
      <SelectCountry
        value={state}
        onChange={(value: any) => setCustomValue("state", value)}
      />
      {/* <Input
        id="state"
        type="text"
        label="State"
        register={register}
        errors={errors}
        validation={{ required: "State is required" }}
        disabled={isLoading}
        value={state}
      /> */}
      <div>
        {street && zipcode && city && state && !isMapLoading && cords ? (
          <Map
            cords={cords}
            street={street}
            zipcode={zipcode}
            city={city}
            state={state}
          />
        ) : (
          <div className="text-2xl text-gray-300 h-96 rounded-md border-[2px] border-gray-300 flex flex-col gap-3 items-center justify-center text-center px-4">
            {isMapLoading ? (
              <span>Loading...</span>
            ) : (
              <>
                <IoMapOutline className="text-4xl" />
                <p className="">
                  Map is going to appear once you fill the location details
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default AddPropertyLocation;
