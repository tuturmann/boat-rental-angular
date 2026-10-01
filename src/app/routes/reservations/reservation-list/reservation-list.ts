import { Component, inject } from '@angular/core';
import { ReservationsService } from '../services/reservations';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ClientIdToNamePipe } from '../../../shared/pipes/client-id-to-name/client-id-to-name-pipe';
import { ClientsService } from '../../clients/services/clients';

export interface Reservation {
  id: number;
  client: number;
  clientName?: string;
  bateau: number;
  debut: Date;
  fin: Date;
  personnes: number;
  prix: number;
  statut: 'À venir' | 'En cours' | 'Passé';
}

@Component({
  imports: [MatTableModule, RouterLink, MatButton, ClientIdToNamePipe],
  selector: 'app-reservation-list',
  styleUrl: './reservation-list.scss',
  templateUrl: './reservation-list.html',
})
export class ReservationList {
  private reservationsService = inject(ReservationsService);
  private clientsService = inject(ClientsService);

  public reservationsList = new MatTableDataSource<Reservation>([]);

  reservationToDelete: Reservation | null = null;

  colonnes: string[] = ['client', 'bateau', 'debut', 'fin', 'personnes', 'prix', 'statut'];

  ngOnInit(): void {
    this.loadReservation();
  }

  loadReservation(): void {
    this.reservationsService.getReservation().subscribe((reservation) => {
      console.log(reservation);
      reservation.forEach((reservation) => {
        this.clientsService.getClientById(reservation.client).subscribe((m) => {
          reservation.clientName = m.nom;
        });
      });
      console.log(reservation);
      this.reservationsList.data = reservation;
    });
  }

  onDelete(reservation: Reservation) {
    if (this.reservationToDelete == reservation) {
      this.reservationsService.deleteReservation(reservation).subscribe((deletion) => {
        console.log(deletion);
      });
      this.loadReservation();
    } else {
      this.reservationToDelete = reservation;
      return;
    }
  }
}
