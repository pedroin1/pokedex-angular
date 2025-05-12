import { TitleCasePipe } from '@angular/common';
import {
  Component,
  input,
  output,
  OutputEmitterRef,
  computed,
} from '@angular/core';
import { IPokemon } from '@models/pokemon';
import { PokemonService } from '@services/pokemon.service';
import { PokemonCodePipe } from 'src/app/pipes/pokemon-code.pipe';

@Component({
  selector: 'app-pokemon-card',
  imports: [TitleCasePipe, PokemonCodePipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  public pokemon = input.required<IPokemon>();

  public isSelected = input.required<boolean>();

  public selectPokemonEvent: OutputEmitterRef<IPokemon> = output();

  protected pokemonNumber = computed(() => {
    const match = this.pokemon().url.match(/\/pokemon\/(\d+)\//);
    return match ? match[1] : '0';
  });

  protected pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${this.pokemonNumber()}.png`;
  });

  constructor(private pokemonService: PokemonService) {}

  protected onSelectPokemon(pokemon: IPokemon): void {
    this.pokemonService.loadPokemonById(this.pokemonNumber());
    this.selectPokemonEvent.emit(pokemon);
  }
}
