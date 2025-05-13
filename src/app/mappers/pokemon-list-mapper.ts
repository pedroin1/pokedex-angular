import { IPokemon } from '@models/pokemon';
import { IPokemonDTO } from '@models/pokemon-dto';
import { RequestPokemonList } from '@models/request-pokemon';

export const pokemonListMapper = (
  request: RequestPokemonList<IPokemonDTO[]>
): IPokemon[] => {
  return request.results.map((pokemonDTO: IPokemonDTO): IPokemon => {
    const pokemonCode = convertPokemonCode(pokemonDTO);

    return {
      code: pokemonCode,
      name: pokemonDTO.name,
      detailUrl: pokemonDTO.url,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonCode}.png`,
    };
  });
};

function convertPokemonCode(pokemonDTO: IPokemonDTO): string {
  const match = pokemonDTO.url.match(/\/pokemon\/(\d+)\//);
  return match ? match[1] : '0';
}
