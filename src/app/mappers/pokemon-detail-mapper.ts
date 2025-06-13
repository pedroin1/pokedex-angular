import { IPokemonDetail } from '@models/pokemon-detail';
import { IPokemonType } from '@models/pokemon-types';
import { RequestPokemonDetail } from '@models/request-pokemon';

export const pokemonDetailMapper = (
  request: RequestPokemonDetail
): IPokemonDetail => {
  return {
    code: request.id,
    name: request.name,
    imageUrl: request.sprites.front_default,
    height: request.height,
    weight: request.weight,
    types: parsePokemonTypes(request.types),
  };
};

function parsePokemonTypes(types: IPokemonType[]): string[] {
  return types.map((type) => type.type.name);
}
