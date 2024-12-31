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
}

type PackageLocationDTO = {
  name: string;
  city: string;
  country: string;
}
