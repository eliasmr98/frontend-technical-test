import { Location } from './location';

export interface Character {
  id: number;
  name: string;
  location: Location;
  status: string;
}
