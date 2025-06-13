import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from '@components/footer/footer.component';
import { HeaderComponent } from '@components/header/header.component';
import { ListPokemonComponent } from '@components/list-pokemon/list-pokemon.component';
import { PhotoCardPokemonComponent } from '@components/photo-card-pokemon/photo-card-pokemon.component';
import { PokemonDetailComponent } from '@components/pokemon-detail/pokemon-detail.component';
import { PokemonService } from '@services/pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    PhotoCardPokemonComponent,
    ListPokemonComponent,
    PokemonDetailComponent,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(protected pokemonService: PokemonService) {}
}
