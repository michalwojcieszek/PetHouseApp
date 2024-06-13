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
    pets: {
      dog: {
        accept: boolean;
        capacity: number;
        price?: number;
      };
      cat: {
        accept: boolean;
        capacity: number;
        price?: number;
      };
      parrot: {
        accept: boolean;
        capacity: number;
        price?: number;
      };
      hamster: {
        accept: boolean;
        capacity: number;
        price?: number;
      };
      snake: {
        accept: boolean;
        capacity: number;
        price?: number;
      };
    };
  };
  createdAt: Date;
  updatedAt: Date;
};
