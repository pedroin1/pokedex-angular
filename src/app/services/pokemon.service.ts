import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface RequestPokemon {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
}

export interface IPokemon {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly apiUrl = environment.API_URL;

  private _pokemonsList$ = new BehaviorSubject<IPokemon[]>([]);

  public readonly pokemonsList$ = this._pokemonsList$.asObservable();

  constructor(private httpClient: HttpClient, private destroyRef: DestroyRef) {
    this.getAllPokemons();
  }

  private getAllPokemons(): void {
    this.httpClient
      .get<RequestPokemon>(`${this.apiUrl}/pokemon?limit=15&offset=0`)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error: unknown) => {
          console.log(error);
          return throwError(() => error);
        }),
        map((request: RequestPokemon) => request.results)
      )
      .subscribe((result) => {
        this._pokemonsList$.next(result);
      });
  }
}
