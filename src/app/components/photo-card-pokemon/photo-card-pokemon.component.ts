import { Component, OnInit } from '@angular/core';
import { PokemonService } from '@services/pokemon.service';

@Component({
  selector: 'app-photo-card-pokemon',
  imports: [],
  templateUrl: './photo-card-pokemon.component.html',
  styleUrl: './photo-card-pokemon.component.scss',
})
export class PhotoCardPokemonComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.pokemon$.subscribe((pokemon) => {
      console.log(pokemon);
    });
  }
}
