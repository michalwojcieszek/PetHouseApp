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
      species: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
    },
    stay: {
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
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
