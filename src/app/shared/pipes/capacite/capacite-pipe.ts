import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capacite',
})
export class CapacitePipe implements PipeTransform {
  transform(value: string): string {
    return value + 'pers.';
  }
}
