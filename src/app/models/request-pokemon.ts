import { IPokemonType } from './pokemon-types';

export interface RequestPokemonList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T;
}

export interface RequestPokemonDetail {
  id: string;
  name: string;
  sprites: { front_default: string };
  height: number;
  weight: number;
  types: IPokemonType[];
}
