import { NgClass } from '@angular/common';
import { Component, input, output, OutputEmitterRef } from '@angular/core';
import { IPokemon } from '@models/pokemon';
import { PokemonService } from '@services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  imports: [NgClass],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  public pokemon = input.required<IPokemon>();

  public isSelected = input.required<boolean>();

  public selectPokemonEvent: OutputEmitterRef<IPokemon> = output();

  constructor(private pokemonService: PokemonService) {}

  protected onSelectPokemon(pokemon: IPokemon): void {
    this.selectPokemonEvent.emit(pokemon);
  }
}
