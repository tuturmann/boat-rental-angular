import { inject, Pipe, PipeTransform } from '@angular/core';
import { ClientsService } from '../../../routes/clients/services/clients';

@Pipe({
  name: 'clientIdToName',
})
export class ClientIdToNamePipe implements PipeTransform {
  private clientsService = inject(ClientsService);
  transform(id: number): string {
    this.clientsService.getClientById(id).subscribe((m) => {
      return m.nom;
    });
    return '';
  }
}
