"use client";

import Input from "@/components/ui/Input";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { pets } from "@/utils/petsAccepted";
import Image from "next/image";
import Counter from "@/components/addProperty/NewPropertyPetsCounter";
import Header2 from "@/components/ui/Header2";
import AddPropertyLocation from "@/components/addProperty/AddPropertyLocation";
import SelectImage from "./SelectImage";
import Button from "../ui/Button";
import FormSection from "./AddPropertySection";
import { sortPetsArr } from "@/utils/sortPetsArr";
import { PetType } from "@/types";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

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

const AddPropertyForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [clickedPets, setClickedPets] = useState<PetType[]>(petsArr);
  const [cords, setCords] = useState(null);

  const ifAtLeastOnePetAccepted = useMemo(() => {
    return clickedPets.some((pet) => pet.accept);
  }, [clickedPets]);

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
        { ...petToEdit, accept: true, capacity: 1, price: 1 },
      ]);
    }

    setClickedPets((clickedPets) => sortPetsArr(clickedPets));

    if (!petToEdit) return;
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { name, description, image, street, zipcode, city, state } = data;
    if (!ifAtLeastOnePetAccepted || !state || !image) {
      toast.error("Some data is missing");
      return;
    }

    const dataToBackend = {
      location: { street, zipcode, city, state, cords },
      name,
      description,
      image,
      pets: clickedPets,
    };

    const createNewProperty = async () => {
      setIsLoading(true);
      try {
        await axios.post("/api/properties", dataToBackend);
        toast.success("New property successfully created");
        router.push("/");
        router.refresh();
      } catch (error) {
        toast.error("Creating new property failed");
      } finally {
        setIsLoading(false);
      }
    };
    createNewProperty();
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Add a new property</h1>
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
            <ul className="flex flex-row gap-8 mb-6">
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
                    alt={`Icon of a ${pet.type}`}
                    width={100}
                    height={100}
                  />
                </li>
              ))}
            </ul>
            {!ifAtLeastOnePetAccepted && (
              <span className="text-red-600">
                Accepting at least one pet is required.
              </span>
            )}
            <ul className="flex flex-col gap-12">
              {clickedPets
                .filter((pet) => pet.accept)
                .map((pet, index) => (
                  <li key={index}>
                    <div className="flex gap-5 items-center">
                      <div className="border-r-[1px] pr-5 h-full">
                        <Image
                          src={pet.icon}
                          alt={`Icon of a ${pet.type}`}
                          width={50}
                          height={50}
                        />
                      </div>
                      <Counter
                        pet={pet}
                        setClickedPets={setClickedPets}
                        clickedPets={clickedPets}
                      />
                    </div>
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
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 mb-12">
          <Button label="Add a property" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddPropertyForm;
