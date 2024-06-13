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
        type: String,
        required: true,
      },
      zipcode: {
        type: String,
      },
      cords: {
        lat: {
          type: String,
          required: true,
        },
        lng: {
          type: String,
          required: true,
        },
      },
      pets: {
        dog: {
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
          },
        },
        cat: {
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
          },
        },
        parrot: {
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
          },
        },
        hamster: {
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
          },
        },
        snake: {
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
          },
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Property = models.Property || model("Property", PropertySchema);

export default Property;
