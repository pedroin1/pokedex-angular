import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import {
  BehaviorSubject,
  catchError,
  map,
  Subject,
  throwError,
  switchMap,
  debounceTime,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RequestPokemonList } from '@models/request-pokemon';
import {
  SCROLL_ADDITIONAL_OFFSET,
  SCROLL_INITIAL_OFFSET,
  SCROLL_LIMIT,
} from '@constants/pokemon-scroll';
import { pokemonListMapper } from '@mappers/pokemon-list-mapper';
import { IPokemon } from '@models/pokemon';
import { pokemonSingleMapper } from '@mappers/pokemon-single';
import { IPokemonDTO } from '@models/pokemon-dto';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  //init as 0
  private offset = SCROLL_INITIAL_OFFSET;

  private readonly apiUrl = environment.API_URL;

  private _pokemonId$ = new Subject<string | number | null>();

  private _pokemon$ = new Subject<IPokemon | null>();

  public pokemon$ = this._pokemon$.asObservable();

  private _selectedPokemon$ = new BehaviorSubject<IPokemon | null>(null);

  public selectedPokemon$ = this._selectedPokemon$.asObservable();

  private _pokemonsList$ = new BehaviorSubject<IPokemon[]>([]);

  public readonly pokemonsList$ = this._pokemonsList$.asObservable();

  private _isLoadingPokemonList$ = new Subject<boolean>();

  public readonly isLoadingPokemonList$ =
    this._isLoadingPokemonList$.asObservable();

  constructor(private httpClient: HttpClient, private destroyRef: DestroyRef) {
    this.getAllPokemons();
    this.getPokemonById();
  }

  private getAllPokemons(): void {
    this._isLoadingPokemonList$.next(true);
    this.httpClient
      .get<RequestPokemonList<IPokemonDTO[]>>(
        `${this.apiUrl}/pokemon?limit=${SCROLL_LIMIT}&offset=${SCROLL_INITIAL_OFFSET}`
      )
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error: unknown) => {
          console.log('Erro ao buscar lista de Pokémons:', error);
          this._isLoadingPokemonList$.next(false);
          return throwError(() => error);
        }),
        map(pokemonListMapper)
      )
      .subscribe((result) => {
        this._pokemonsList$.next(result);
        this._isLoadingPokemonList$.next(false);
      });
  }

  private getPokemonById(): void {
    this._pokemonId$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((pokemonId) =>
          this.httpClient
            .get<IPokemon>(`${this.apiUrl}/pokemon/${pokemonId}`)
            .pipe(
              catchError((error) => {
                console.log('Erro ao buscar Pokémon:', error);
                return throwError(() => error);
              }),
              map(pokemonSingleMapper)
            )
        )
      )
      .subscribe((pokemon) => {
        this._pokemon$.next(pokemon);
      });
  }

  public loadPokemonById(id: string | number): void {
    this._pokemonId$.next(id);
  }

  public clearPokemon(): void {
    this._pokemon$.next(null);
  }

  public loadMorePokemons(): void {
    this._isLoadingPokemonList$.next(true);
    //updating offset
    this.offset += SCROLL_ADDITIONAL_OFFSET;

    this.httpClient
      .get<RequestPokemonList<IPokemonDTO[]>>(
        `${this.apiUrl}/pokemon?limit=${SCROLL_LIMIT}&offset=${this.offset}`
      )
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(1000),
        catchError((error: unknown) => {
          console.log('Erro ao atualizar lista de Pokémons:', error);
          this._isLoadingPokemonList$.next(false);
          return throwError(() => error);
        }),

        map(pokemonListMapper)
      )
      .subscribe((result) => {
        this._pokemonsList$.next([
          ...this._pokemonsList$.getValue(),
          ...result,
        ]);
        this._isLoadingPokemonList$.next(false);
      });
  }

  public selectPokemon(pokemon: IPokemon): void {
    if (this._selectedPokemon$.getValue()?.name === pokemon.name) {
      this._selectedPokemon$.next(null);
      return;
    } else {
      this._selectedPokemon$.next(pokemon);
    }
  }
}
