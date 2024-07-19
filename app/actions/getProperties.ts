import connectDB from "@/config/database";
import Property from "@/models/Property";

export type IPropertiesParams = {
  pet: string | string[];
  country: string;
};

export default async function getProperties(params: IPropertiesParams) {
  await connectDB();
  const { pet, country } = params;
  console.log(params);

  try {
    const allProperties = await Property.find({});
    let properties = allProperties;

    //single pet & country PROVIDED
    if (pet && !Array.isArray(pet) && country) {
      properties = allProperties.filter(
        (property) =>
          property.location.state.code === country &&
          property.pets.find((petEl: any) => pet === petEl.type).accept
      );
    }

    //single pet & NO country PROVIDED
    if (pet && !Array.isArray(pet) && !country) {
      properties = allProperties.filter(
        (property) =>
          property.pets.find((petEl: any) => pet === petEl.type).accept
      );
    }

    //many pets & country PROVIDED
    if (pet && Array.isArray(pet) && pet.length > 1 && country) {
      properties = allProperties.filter(
        (property) =>
          property.location.state.code === country &&
          pet.every(
            (petSingle: any) =>
              property.pets.find((petEl: any) => petSingle === petEl.type)
                .accept
          )
      );
    }

    //many pets & NO country PROVIDED
    if (pet && Array.isArray(pet) && pet.length > 1 && !country) {
      properties = allProperties.filter((property) =>
        pet.every(
          (petSingle: any) =>
            property.pets.find((petEl: any) => petSingle === petEl.type).accept
        )
      );
    }

    //NO pet & country PROVIDED
    if (!pet && country) {
      properties = allProperties.filter(
        (property) => property.location.state.code === country
      );
    }

    //NO pet & country PROVIDED
    if (!pet && country) {
      properties = allProperties.filter(
        (property) => property.location.state.code === country
      );
    }

    return JSON.parse(JSON.stringify(properties));
  } catch (error: any) {
    throw new Error(error);
  }
}
