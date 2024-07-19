"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Spinner from "./Spinner";

type AddToFavouriteProps = {
  currentPropertyId: string;
  currentUserFavourites?: string[];
};

const AddToFavourite = ({
  currentUserFavourites,
  currentPropertyId,
}: AddToFavouriteProps) => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentUserFavourites) return;
    if (currentUserFavourites.includes(currentPropertyId)) {
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }, [currentUserFavourites, currentPropertyId]);

  const handleToggle = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      const { data } = await axios.post(`/api/favourites/${currentPropertyId}`);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUserFavourites) return null;

  return (
    <div className="absolute top-2 right-2">
      {isLoading ? (
        <Spinner />
      ) : (
        <div
          className="bg-white hover:text-red-600 transition p-1 rounded-full cursor-pointer "
          onClick={handleToggle}
        >
          {isClicked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
        </div>
      )}
    </div>
  );
};
export default AddToFavourite;
