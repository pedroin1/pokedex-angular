import { IPokemon } from '@models/pokemon';

export const pokemonSingleMapper = (request: unknown): IPokemon => {
  const typedRequest = request as {
    id: string;
    name: string;
    sprites: { front_default: string };
  };
  return {
    code: typedRequest.id,
    name: typedRequest.name,
    detailUrl: `aa`,
    imageUrl: typedRequest.sprites.front_default,
  };
};
