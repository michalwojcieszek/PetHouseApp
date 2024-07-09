"use client";

import PropertyCardPets from "../card/PropertyCardPets";

type PropertyCardPetsProps = {
  type: string;
  accept: boolean;
  capacity: number;
  price: number;
  isHorizontal?: boolean;
};

const PetsInfo = ({
  petsAccepted,
  petInfo,
}: {
  petsAccepted: PropertyCardPetsProps[];
  petInfo?: keyof PropertyCardPetsProps;
}) => {
  return (
    <div className="flex gap-4">
      {petsAccepted.map((petAccepted, index) => (
        <PropertyCardPets
          key={index}
          petAccepted={petAccepted}
          petInfo={petInfo}
        />
      ))}
    </div>
  );
};
export default PetsInfo;
