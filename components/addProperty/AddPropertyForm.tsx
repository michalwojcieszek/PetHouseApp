"use client";

import Input from "@/components/Input";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { pets, PetViewProps } from "@/utils/petsAccepted";
import Image from "next/image";
import Counter from "@/components/Counter";
import Header2 from "@/components/Header2";
import AddPropertyLocation from "@/components/addProperty/AddPropertyLocation";

const AddPropertyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clickedPets, setClickedPets] = useState<string[]>([]);
  const [cords, setCords] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    // defaultValues: { name: "", password: "" },
  });

  const name = watch("name");
  const description = watch("description");
  const street = watch("street");
  const zipcode = watch("zipcode");
  const city = watch("city");
  const state = watch("state");
  //   const dogCapacity = watch("dogCapacity");
  //   const snakeCapacity = watch("snakeCapacity");
  //   const catCapacity = watch("catCapacity");
  //   const parrotCapacity = watch("parrotCapacity");
  //   const hamsterCapacity = watch("hamsterCapacity");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  function handleClickPet(pet: PetViewProps) {
    if (clickedPets.includes(pet.type)) {
      setClickedPets((clickedPets) =>
        clickedPets.filter((petName) => petName !== pet.type)
      );
    } else {
      setClickedPets((clickedPets) => [...clickedPets, pet.type]);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Add a new property</h1>
      <form>
        <div className="flex flex-col gap-6">
          <hr />
          <Header2>Write some details about your property</Header2>
          <Input
            id="name"
            type="text"
            label="Name of the property"
            register={register}
            errors={errors}
            validation={{ required: "Name is required" }}
            disabled={isLoading}
            value={name}
          />
          <Input
            id="description"
            type="text"
            label="Description of the property"
            register={register}
            errors={errors}
            validation={{ required: "Description is required" }}
            disabled={isLoading}
            value={description}
          />
          <hr />
          <Header2>Select the pets you accept</Header2>
          <ul className="flex flex-row gap-8">
            {pets.map((pet, index) => (
              <li
                key={index}
                onClick={() => handleClickPet(pet)}
                className={`w-14 flex flex-col items-center gap-1 ${
                  clickedPets.includes(pet.type)
                    ? "grayscale-0 opacity-100"
                    : "grayscale opacity-50"
                } hover:grayscale-0 hover:opacity-100 transition cursor-pointer`}
              >
                <span className="text-theme-color">{pet.type}</span>
                <Image src={pet.icon} alt={pet.type} width={100} height={100} />
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-6">
            {clickedPets.map((pet, index) => (
              <li key={index}>
                <Counter
                  petName={pet}
                  value={watch(`${pet}Capacity`)}
                  onChange={(value) => setCustomValue(`${pet}Capacity`, value)}
                />
              </li>
            ))}
          </ul>
          <hr />
          <Header2>Share the location of your property</Header2>
          <AddPropertyLocation
            register={register}
            setCustomValue={setCustomValue}
            errors={errors}
            isLoading={isLoading}
            street={street}
            zipcode={zipcode}
            city={city}
            state={state}
            setCords={setCords}
            cords={cords}
          />
          <hr />
          <Header2>Send a square photo of your property</Header2>
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;
