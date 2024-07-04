import { Schema, model, models } from "mongoose";

const PropertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        name: {
          type: String,
        },
        flag: {
          type: String,
        },
        code: {
          type: String,
        },
      },
      zipcode: {
        type: String,
      },
      cords: {
        lat: {
          type: Number,
          required: true,
        },
        lng: {
          type: Number,
          required: true,
        },
      },
    },
    pets: [
      {
        type: {
          type: String,
          enum: ["dog", "cat", "parrot", "hamster", "snake"],
          required: true,
        },
        accept: {
          type: Boolean,
          required: true,
        },
        capacity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        icon: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
