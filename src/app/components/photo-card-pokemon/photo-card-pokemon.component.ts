import { Component, OnInit, signal } from '@angular/core';
import { IPokemon } from '@models/pokemon';
import { PokemonService } from '@services/pokemon.service';

@Component({
  selector: 'app-photo-card-pokemon',
  imports: [],
  templateUrl: './photo-card-pokemon.component.html',
  styleUrl: './photo-card-pokemon.component.scss',
})
export class PhotoCardPokemonComponent implements OnInit {
  protected pokemon = signal<IPokemon | null>(null);

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.pokemon$.subscribe((pokemon) => {
      console.log(pokemon);

      this.pokemon.set(pokemon);
    });
  }
}
