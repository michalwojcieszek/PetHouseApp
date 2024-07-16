import { Schema, model, models } from "mongoose";

const BookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      reqired: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
      reqired: true,
    },
    pet: {
      type: {
        type: String,
        enum: ["dog", "cat", "parrot", "hamster", "snake"],
        required: true,
      },
      capacity: {
        type: Number,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
    },
    dates: {
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: true,
      },
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
