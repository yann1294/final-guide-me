export type PackageDTO = {
  id?: string;
  name: string;
  price: number;
  images?: string[];
  durationDays: number;
  discount: number;
  numberOfSeats: number;
  description: string;
  isAvailable: boolean;
  guide: string;
  location: PackageLocationDTO;
  tours: string[];
  date: Date
}

type PackageLocationDTO = {
  name: string;
  city: string;
  country: string;
}
