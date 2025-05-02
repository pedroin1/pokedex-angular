import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { IPokemon } from '@services/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  imports: [NgClass],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  protected selected = signal<boolean>(false);
  public pokemon = input.required<IPokemon>();

  protected onToogleSelect(): void {
    this.selected.update((value) => (value = !value));
  }
}
