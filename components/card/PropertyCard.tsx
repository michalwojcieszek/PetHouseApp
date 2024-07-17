"use client";

import { PropertyType } from "@/types";
import { useRouter } from "next/navigation";
import PropertyCardPets from "./PropertyCardPets";
import FlagImg from "../FlagImg";
import PropertyImg from "../PropertyImg";
import AddToFavourite from "../AddToFavourite";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader";
import RemoveButton from "../RemoveButton";

const PropertyCard = ({
  property,
  currentUserFavourites,
  additionalInfo,
  type,
  bookingId,
}: {
  property: PropertyType;
  currentUserFavourites?: string[];
  additionalInfo?: React.ReactNode;
  type?: string;
  bookingId?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { pets } = property;
  const { location } = property;

  const petsAccepted = pets.filter((pet) => pet.accept);

  const handleToggleFavourite = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      const { data } = await axios.post(`/api/favourites/${property._id}`);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOwnProperty = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`/api/properties/${property._id}`);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBooking = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      const { data } = await axios.delete(`/api/bookings/${bookingId}`);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="rounded-md shadow-[0_0px_8px_-0px_rgba(0,0,0,0.07)] cursor-pointer flex lg:flex-row lg:gap-3 flex-col"
      onClick={() => router.push(`/property/${property._id}`)}
    >
      <div className="overflow-hidden lg:w-64 rounded-t-md lg:rounded-l-md lg:rounded-tr-none relative">
        <PropertyImg
          src={property.image}
          alt={property.name}
          id={property._id}
        />
        <AddToFavourite
          currentPropertyId={property._id}
          currentUserFavourites={currentUserFavourites}
        />
      </div>
      <div className="flex flex-col gap-3 px-4 py-3">
        <div>
          <h2 className="font-bold text-xl">{property.name}</h2>
          <h3 className="text-grey-secondary">{property.description}</h3>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <FlagImg
            code={property.location.state.code}
            name={property.location.state.name}
          />
          <p>
            {location.street}, {location.zipcode} {location.city},{" "}
            {location.state.name}
          </p>
        </div>
        {!additionalInfo && (
          <div className="flex flex-col gap-2">
            <p className="flex flex-col gap-2 text-theme-color font-semibold">
              Accepting:
            </p>
            <ul className="flex flex-row gap-5">
              {petsAccepted.map((petAccepted, index) => (
                <PropertyCardPets key={index} petAccepted={petAccepted} />
              ))}
            </ul>
          </div>
        )}
        {additionalInfo}
        {/* <p>
          {location.street}, {location.zipcode} {location.city} -{" "}
          {location.state.name}
        </p> */}

        {isLoading && <Loader />}

        {!isLoading && type === "favourites" && (
          <div>
            <RemoveButton onClick={handleToggleFavourite}>
              Remove from favourites
            </RemoveButton>
          </div>
        )}
        {!isLoading && type === "own" && (
          <div>
            <RemoveButton onClick={handleDeleteOwnProperty}>
              Delete property
            </RemoveButton>
          </div>
        )}
        {!isLoading && type === "bookings" && (
          <div>
            <RemoveButton onClick={handleDeleteBooking}>
              Cancel booking
            </RemoveButton>
          </div>
        )}
        {!isLoading && !type && (
          <button className="font-semibold bg-theme-color rounded-md py-1 w-1/3 text-white hover:opacity-80 tracking-wid mt-auto">
            Details
          </button>
        )}
      </div>
    </div>
  );
};
export default PropertyCard;
