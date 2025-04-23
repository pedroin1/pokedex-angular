import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { PokemonService } from '@services/pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokedex-angular';

  constructor(protected pokemonService: PokemonService) {}
}
