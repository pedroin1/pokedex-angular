import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { PokemonCardComponent } from '@components/pokemon-card/pokemon-card.component';
import { PokemonService } from '@services/pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  imports: [AsyncPipe, PokemonCardComponent],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss',
})
export class ListPokemonComponent {
  constructor(protected pokemonService: PokemonService) {}
}
