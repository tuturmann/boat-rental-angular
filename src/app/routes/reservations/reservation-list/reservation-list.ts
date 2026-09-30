import { Component, inject } from '@angular/core';
import { ReservationsService } from '../services/reservations';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

export interface Reservation {
  id: number;
  client: number;
  bateau: number;
  debut: Date;
  fin: Date;
  personnes: number;
  prix: number;
  statut: 'À venir' | 'En cours' | 'Passé';
}

@Component({
  imports: [MatTableModule, RouterLink, MatButton],
  selector: 'app-reservation-list',
  styleUrl: './reservation-list.scss',
  templateUrl: './reservation-list.html',
})
export class ReservationList {
  private reservationsService = inject(ReservationsService);
  public reservationsList = new MatTableDataSource<Reservation>([]);

  reservationToDelete: Reservation | null = null;

  colonnes: string[] = ['client', 'bateau', 'debut', 'fin', 'personnes', 'prix', 'statut'];

  ngOnInit(): void {
    this.loadReservation();
  }

  loadReservation(): void {
    this.reservationsService.getReservation().subscribe((bateaux) => {
      this.reservationsList.data = bateaux;
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
