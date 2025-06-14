import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PokemonCardComponent } from '@components/pokemon-card/pokemon-card.component';
import { IPokemon } from '@models/pokemon';
import { PokemonService } from '@services/pokemon.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-list-pokemon',
  imports: [AsyncPipe, PokemonCardComponent, InfiniteScrollDirective],
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss',
})
export class ListPokemonComponent implements OnInit {
  protected selectedPokemon = signal<IPokemon | null>(null);

  protected isLoadingList = signal(false);

  constructor(
    protected pokemonService: PokemonService,
    private destroyRef: DestroyRef
  ) {}

  protected checkPokemonIsSelected(pokemon: IPokemon): boolean {
    return this.selectedPokemon() === pokemon;
  }

  protected onSelectPokemon(pokemon: IPokemon | null): void {
    this.selectedPokemon.set(pokemon);

    if (pokemon) {
      this.pokemonService.loadPokemonById(pokemon.code);
    } else {
      this.pokemonService.clearPokemon();
    }
  }

  protected onScroll(): void {
    this.pokemonService.loadMorePokemons();
  }

  ngOnInit(): void {
    this.pokemonService.selectedPokemon$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pokemon) => {
        this.selectedPokemon.set(pokemon);
      });

    this.pokemonService.isLoadingPokemonList$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoading) => {
        this.isLoadingList.set(isLoading);
      });
  }
}
