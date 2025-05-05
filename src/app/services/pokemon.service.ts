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
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPokemon } from '@models/pokemon';
import { RequestPokemon } from '@models/request-pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly apiUrl = environment.API_URL;

  private _pokemonId$ = new Subject<string | number>();

  private _pokemon$ = new BehaviorSubject<IPokemon | null>(null);

  public pokemon$ = this._pokemon$.asObservable();

  private _selectedPokemon$ = new BehaviorSubject<IPokemon | null>(null);

  public selectedPokemon$ = this._selectedPokemon$.asObservable();

  private _pokemonsList$ = new BehaviorSubject<IPokemon[]>([]);

  public readonly pokemonsList$ = this._pokemonsList$.asObservable();

  constructor(private httpClient: HttpClient, private destroyRef: DestroyRef) {
    this.getAllPokemons();
    this.getPokemonById();
  }

  private getAllPokemons(): void {
    this.httpClient
      .get<RequestPokemon>(`${this.apiUrl}/pokemon?limit=15&offset=0`)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error: unknown) => {
          console.log('Erro ao buscar lista de Pokémons:', error);
          return throwError(() => error);
        }),
        map((request: RequestPokemon) => request.results)
      )
      .subscribe((result) => {
        this._pokemonsList$.next(result);
      });
  }

  private getPokemonById(): void {
    this._pokemonId$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((pokemonId) =>
          this.httpClient
            .get<IPokemon>(`${this.apiUrl}/pokemo/${pokemonId}`)
            .pipe(
              catchError((error) => {
                console.log('Erro ao buscar Pokémon:', error);
                return throwError(() => error);
              })
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

  public selectPokemon(pokemon: IPokemon): void {
    if (this._selectedPokemon$.getValue()?.name === pokemon.name) {
      this._selectedPokemon$.next(null);
      return;
    } else {
      this._selectedPokemon$.next(pokemon);
    }
  }
}
