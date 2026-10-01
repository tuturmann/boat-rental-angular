import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClientsService } from '../services/clients';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ReservationsService } from '../../reservations/services/reservations';

export interface Client {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  permisBateau: boolean;
  statut: 'Actif' | 'A risque';
}

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatTableModule, RouterLink, MatButton],
  styleUrl: './client-list.scss',
  templateUrl: './client-list.html',
})
export class ClientList implements OnInit {
  private clientsService = inject(ClientsService);
  private reservationsService = inject(ReservationsService);
  public clientList = new MatTableDataSource<Client>([]);

  colonnes: string[] = ['nom', 'prenom', 'email', 'telephone', 'permisBateau', 'actions'];

  clientToEdit: Client | null = null;
  clientToDelete: Client | null = null;

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(): void {
    this.clientsService.getClient().subscribe((client) => {
      this.clientList.data = client;
    });
  }

  onDelete(client: Client) {
    if (this.clientToDelete !== client) {
      this.clientToDelete = client;
      return;
    }

    this.reservationsService.getReservationByClient(+client.id).subscribe((reservations) => {
      const nbReservationsActives = reservations.length;

      if (nbReservationsActives > 0) {
        alert(
          'Vous ne pouvez pas supprimer ce client car au moins une réservation existe pour ce client.',
        );
        return;
      } else {
        this.clientsService.deleteClient(client)?.subscribe(() => {
          alert(`Le client ${client.prenom} ${client.nom} a bien été supprimé`);
          this.loadClient();
        });
      }
    });
  }

  recherche(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const valeur = inputElement.value;
    this.clientList.filter = valeur.trim().toLowerCase();
  }
}
