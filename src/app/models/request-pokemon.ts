import { IPokemonDTO } from './pokemon-dto';

export interface RequestPokemon {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonDTO[];
}
