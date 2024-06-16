type Pet = {
  type: string;
  accept: boolean;
  capacity: number;
  price: number;
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
