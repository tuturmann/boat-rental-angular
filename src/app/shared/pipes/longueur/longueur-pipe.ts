import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longueur',
})
export class LongueurPipe implements PipeTransform {
  transform(value: string): string {
    return value+'m';
  }
}
