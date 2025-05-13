import { TitleCasePipe } from '@angular/common';
import { Component, input, output, OutputEmitterRef } from '@angular/core';
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

  constructor(private pokemonService: PokemonService) {}

  protected onSelectPokemon(pokemon: IPokemon): void {
    this.pokemonService.loadPokemonById(pokemon.code);
    this.selectPokemonEvent.emit(pokemon);
  }
}
