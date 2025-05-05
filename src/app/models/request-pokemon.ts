import { IPokemon } from './pokemon';

export interface RequestPokemon {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
}
