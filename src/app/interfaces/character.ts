import { Location } from './location';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  location: Location;
  image: string;
}
