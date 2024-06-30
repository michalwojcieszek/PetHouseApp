import { PetType } from "@/types";

export const sortPetsArr = (petsArr: PetType[]) => {
  return petsArr.sort((a, b) => a.type.localeCompare(b.type));
};
