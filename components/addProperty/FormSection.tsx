"use client";

import Input from "@/components/Input";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { pets } from "@/utils/petsAccepted";
import Image from "next/image";
import Counter from "@/components/Counter";
import Header2 from "@/components/Header2";
import AddPropertyLocation from "@/components/addProperty/AddPropertyLocation";
import SelectImage from "./SelectImage";
import Button from "../Button";
import FormSection from "./AddPropertySection";
import { sortPetsArr } from "@/utils/sortPetsArr";
import { CurrentUserType, PetType } from "@/types";
import getUser from "@/app/actions/getAuthUser";

const petsArr = sortPetsArr(
  pets.map((pet) => {
    return {
      type: pet.type,
      icon: pet.icon,
      accept: false,
      capacity: 0,
      price: 0,
    };
  })
);

const AddPropertyForm = ({ currentUser }: { currentUser: CurrentUserType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [clickedPets, setClickedPets] = useState<PetType[]>(petsArr);
  const [cords, setCords] = useState(null);
  console.log(currentUser);

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
  const image = watch("image");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleClickPet = (pet: PetType) => {
    const petToEdit = clickedPets.find(
      (clickedPet) => clickedPet.type === pet.type
    );

    if (petToEdit && pet.accept) {
      setClickedPets((clickedPets: PetType[]) => [
        ...clickedPets.filter(
          (clickedPet: PetType) => clickedPet.type !== pet.type
        ),
        { ...petToEdit, accept: false, capacity: 0 },
      ]);
    }

    if (petToEdit && !pet.accept) {
      setClickedPets((clickedPets: PetType[]) => [
        ...clickedPets.filter(
          (clickedPet: PetType) => clickedPet.type !== pet.type
        ),
        { ...petToEdit, accept: true, capacity: 1 },
      ]);
    }

    setClickedPets((clickedPets) => sortPetsArr(clickedPets));

    console.log(clickedPets);
    if (!petToEdit) return;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { name, description, image, street, zipcode, city, state } = data;
    const dataToBackend = {
      location: { street, zipcode, city, state },
      name,
      description,
      image,
      pets: clickedPets,
      owner: currentUser._id,
    };
    console.log(dataToBackend);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Add a new property</h1>
      <hr />
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <FormSection>
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
          </FormSection>
          <hr />
          <FormSection>
            <Header2>Select the pets you accept</Header2>
            <ul className="flex flex-row gap-8">
              {clickedPets.map((pet, index) => (
                <li
                  key={index}
                  onClick={() => handleClickPet(pet)}
                  className={`w-14 flex flex-col items-center gap-1 ${
                    pet.accept
                      ? "grayscale-0 opacity-100"
                      : "grayscale opacity-50"
                  } hover:grayscale-0 hover:opacity-100 transition cursor-pointer`}
                >
                  <span className="text-theme-color">{pet.type}</span>
                  <Image
                    src={pet.icon}
                    alt={pet.type}
                    width={100}
                    height={100}
                  />
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-6">
              {clickedPets
                .filter((pet) => pet.accept)
                .map((pet, index) => (
                  <li key={index}>
                    <Counter
                      pet={pet}
                      setClickedPets={setClickedPets}
                      clickedPets={clickedPets}
                    />
                  </li>
                ))}
            </ul>
          </FormSection>
          <hr />
          <FormSection>
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
          </FormSection>
          <hr />
          <FormSection>
            <Header2>Send a square photo of your property</Header2>
            <SelectImage
              value={image}
              onChange={(value) => setCustomValue("image", value)}
            />
          </FormSection>
          <hr />
        </div>
        <div className="w-1/3 mb-12">
          <Button label="Add a property" />
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;
