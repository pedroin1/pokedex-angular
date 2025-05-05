import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonCode',
})
export class PokemonCodePipe implements PipeTransform {
  transform(value: string | number): string {
    if (!value) return '';

    const stringValue = value.toString();
    return stringValue.padStart(3, '0');
  }
}
