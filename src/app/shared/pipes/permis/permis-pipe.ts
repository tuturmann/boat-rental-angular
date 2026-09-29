import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permis',
})
export class PermisPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Requis' : 'Non';
  }
}
