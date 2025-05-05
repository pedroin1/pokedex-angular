import { PokemonCodePipe } from './pokemon-code.pipe';

describe('PokemonCodePipe', () => {
  it('create an instance', () => {
    const pipe = new PokemonCodePipe();
    expect(pipe).toBeTruthy();
  });
});
