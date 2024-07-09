"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type AddToFavouriteProps = {
  currentUserFavourites?: string[];
};

const AddToFavourite = ({ currentUserFavourites }: AddToFavouriteProps) => {
  const [isClicked, setIsClicked] = useState(false);
  console.log(currentUserFavourites);

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsClicked((curValue) => !curValue);
  };

  if (!currentUserFavourites) return null;

  return (
    <div
      className="bg-white p-1 rounded-full cursor-pointer absolute top-2 right-2"
      onClick={handleToggle}
    >
      {isClicked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
    </div>
  );
};
export default AddToFavourite;
