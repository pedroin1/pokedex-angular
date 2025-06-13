import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IPokemonDetail } from '@models/pokemon-detail';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailComponent {
  pokemon = input.required<IPokemonDetail>();
}
