"use client";

import { useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import useLogin from "@/hooks/useLogin";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BookingType, CurrentUserType, PetType, PropertyType } from "@/types";
import Calendar from "@/components/Calendar";
import Image from "next/image";
import BookingPetCounter from "./BookingPetCounter";
import Header3 from "./Header3";
import Button from "./Button";
import Loader from "./Loader";

type DayBookedDetails = {
  day: Date;
  petsNumber: number;
  petType: string;
};

type PropertySidebarInputProps = {
  currentUser?: CurrentUserType;
  property: PropertyType;
  bookings: BookingType[];
};

export const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const PropertySidebarInput = ({
  currentUser,
  property,
  bookings,
}: PropertySidebarInputProps) => {
  const petsAccepted = property.pets.filter((pet) => pet.accept === true);

  const { open: openLogin } = useLogin();
  const router = useRouter();
  const [bookingPetCount, setBookingPetCount] = useState(1);
  const [clickedPet, setClickedPet] = useState<PetType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number | null>(0);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const handleClickPet = (pet: PetType) => {
    if (!currentUser) {
      openLogin();
      return;
    }

    if (clickedPet === pet) {
      setClickedPet(null);
    } else {
      setClickedPet(pet);
    }
  };

  function summarizeDaysBooked(arr: DayBookedDetails[]) {
    const summary: { [key: string]: DayBookedDetails } = {};

    arr.forEach((item: DayBookedDetails) => {
      const date = item.day.toDateString(); // Convert date to a comparable format

      if (summary[date]) {
        summary[date].petsNumber += item.petsNumber;
      } else {
        summary[date] = { ...item, petsNumber: item.petsNumber };
      }
    });

    return Object.values(summary);
  }

  const isCalendarDisabled = useMemo(() => {
    if (!clickedPet) {
      return true;
    } else {
      return false;
    }
  }, [clickedPet]);

  const disabledDates = useMemo(() => {
    // let dates: Date[] = [];
    let datesArr: DayBookedDetails[] = [];
    if (!clickedPet) return;

    const bookingsOfSelectedPet = bookings.filter(
      (booking) => booking.pet.type === clickedPet.type
    );

    bookingsOfSelectedPet.forEach((booking: BookingType) => {
      const range = eachDayOfInterval({
        start: new Date(booking.dates.startDate),
        end: new Date(booking.dates.endDate),
      });
      range.forEach((day: Date) => {
        datesArr = [
          ...datesArr,
          { day, petsNumber: booking.pet.count, petType: booking.pet.type },
        ];
      });
    });
    const summarizedDays = summarizeDaysBooked(datesArr);
    console.log(datesArr);
    console.log(summarizedDays);
    const datesDisabled = summarizedDays
      .filter((el: DayBookedDetails) => {
        console.log(el);
        if (clickedPet.capacity - el.petsNumber < bookingPetCount) {
          return el.day;
        }
      })
      .map((el: any) => el.day);
    console.log(datesDisabled);
    return datesDisabled;
  }, [bookings, clickedPet, bookingPetCount]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const daysCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (daysCount && clickedPet?.price && bookingPetCount) {
        setTotalPrice(daysCount * clickedPet?.price * bookingPetCount);
      } else {
        setTotalPrice(null);
      }
    }
  }, [dateRange.startDate, dateRange.endDate, bookingPetCount, clickedPet]);

  const createBooking = async () => {
    if (!clickedPet || !bookingPetCount || !dateRange) {
      toast.error("Some data is missing");
      return;
    }
    if (!totalPrice) {
      toast.error("Your pet has to stay for at least 1 night");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/api/bookings", {
        totalPrice,
        dates: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
        property: property?._id,
        user: currentUser?._id,
        pet: {
          type: clickedPet.type,
          capacity: property.pets.find((pet) => pet.type === clickedPet.type)
            ?.capacity,
          count: bookingPetCount,
        },
      });
      toast.success("Booking created!");
      setDateRange(initialDateRange);
      router.refresh();
    } catch (error) {
      toast.error("Could not create a booking. Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Header3>Select your pet</Header3>
        <ul className="flex gap-6">
          {petsAccepted.map((pet, index) => (
            <li
              key={index}
              onClick={() => {
                handleClickPet(pet);
              }}
              className={`w-14 flex flex-col items-center gap-1 ${
                clickedPet === pet
                  ? "grayscale-0 opacity-100"
                  : "grayscale opacity-50"
              } hover:grayscale-0 hover:opacity-100 transition cursor-pointer`}
            >
              <span className="text-theme-color">{pet.type}</span>
              <Image src={pet.icon} alt={pet.type} width={100} height={100} />
            </li>
          ))}
        </ul>
        {clickedPet && (
          <p className="text-sm mb-3">
            Nightly {clickedPet?.type} price:{" "}
            <span className="font-bold">{clickedPet?.price} $</span>
          </p>
        )}
      </div>
      {clickedPet?.price && (
        <div className="flex flex-col gap-3">
          <Header3>Select the quantity of {clickedPet.type}s</Header3>
          <BookingPetCounter
            count={bookingPetCount}
            setCount={setBookingPetCount}
            pet={clickedPet}
          />
        </div>
      )}
      <div className="flex flex-col gap-3">
        {clickedPet && <Header3>Pick the dates you want</Header3>}
        <Calendar
          disabled={isCalendarDisabled}
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => {
            if (value.selection.startDate && value.selection.endDate) {
              setDateRange({
                startDate: value.selection.startDate,
                endDate: value.selection.endDate,
                key: "selection",
              });
              console.log(value);
            }
          }}
        />
        {!isCalendarDisabled && clickedPet?.price && totalPrice && (
          <p className="text-lg ml-3">
            Total price: <span className="font-bold">{totalPrice} $</span>
          </p>
        )}
      </div>
      <Button
        label={`Book for your pet${bookingPetCount > 1 ? "s" : ""}`}
        action={createBooking}
        type="button"
        primary
        disabled={isCalendarDisabled}
      />
    </div>
  );
};
export default PropertySidebarInput;
