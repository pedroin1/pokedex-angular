import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonCardComponent } from '@components/pokemon-card/pokemon-card.component';
import { IPokemon } from '@models/pokemon';
import { PokemonService } from '@services/pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  imports: [AsyncPipe, PokemonCardComponent],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss',
})
export class ListPokemonComponent implements OnInit {
  protected selectedPokemon = signal<IPokemon | null>(null);

  constructor(
    protected pokemonService: PokemonService,
    private destroyRef: DestroyRef
  ) {}

  protected checkPokemonIsSelected(pokemon: IPokemon): boolean {
    return this.selectedPokemon() === pokemon;
  }

  ngOnInit(): void {
    this.pokemonService.selectedPokemon$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pokemon) => {
        this.selectedPokemon.set(pokemon);
      });
  }
}
