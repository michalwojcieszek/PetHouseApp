export type PetType = {
  type: string;
  accept: boolean;
  capacity: number;
  price: number;
  icon: string;
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
    state: {
      name: string;
      flag: string;
      code: string;
    };
    zipcode?: string;
    cords: {
      lat: number;
      lng: number;
    };
  };
  pets: PetType[];
  createdAt: Date;
  updatedAt: Date;
};

export type UserType = {
  createdAt: string;
  email: string;
  favourites: string[];
  name: string;
  password: string;
  updatedAt: string;
  _id: string;
};

export type CurrentUserType = UserType & {
  image?: string;
};
