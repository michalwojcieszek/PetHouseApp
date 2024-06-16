type Pet = {
  type: String;
  accept: Boolean;
  capacity: Number;
  price: Number;
};

export type PropertyType = {
  _id: string;
  owner: string;
  name: string;
  description: string;
  image: string;
  location: {
    street?: string;
    city?: string;
    state: string;
    zipcode?: string;
    cords: {
      lat: string;
      lng: string;
    };
  };
  pets: Pet[];
  createdAt: Date;
  updatedAt: Date;
};
