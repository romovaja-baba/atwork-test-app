export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export type UserStatus = 'active' | 'archived' | 'hidden';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  companyName: string;
  status: UserStatus;
  avatar: string;
}

export interface EditFormValues {
  name: string;
  username: string;
  email: string;
  city: string;
  phone: string;
  companyName: string;
}
