import { Component, inject } from '@angular/core';
import { ReservationsService } from '../services/reservations';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ClientsService } from '../../clients/services/clients';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { forkJoin, switchMap, map } from 'rxjs';
import { FleetService } from '../../fleet/services/fleet';

export interface Reservation {
  id: number;
  client: number;
  clientName?: string;
  bateau: number;
  bateauName?: string;
  debut: Date;
  fin: Date;
  personnes: number;
  prix: number;
  statut: 'À venir' | 'En cours' | 'Passé';
}

@Component({
  imports: [MatTableModule, RouterLink, MatButton, CurrencyPipe, NgClass, DatePipe],
  selector: 'app-reservation-list',
  styleUrl: './reservation-list.scss',
  templateUrl: './reservation-list.html',
})
export class ReservationList {
  private reservationsService = inject(ReservationsService);
  private clientsService = inject(ClientsService);
  private fleetService = inject(FleetService);

  public reservationsList = new MatTableDataSource<Reservation>([]);

  reservationToDelete: Reservation | null = null;

  colonnes: string[] = ['client', 'bateau', 'debut', 'fin', 'personnes', 'prix', 'statut'];

  ngOnInit(): void {
    this.loadReservation();
  }

  loadReservation(): void {
    this.reservationsService
      .getReservation()
      .pipe(
        switchMap((reservations) => {
          if (reservations.length === 0) {
            return [[]];
          }

          const allRequests = reservations.map((res) =>
            forkJoin({
              client: this.clientsService.getClientById(res.client),
              bateau: this.fleetService.getBoatById(res.bateau),
            }).pipe(
              map(({ client, bateau }) => {
                res.clientName = `${client.prenom} ${client.nom}`;
                res.bateauName = bateau.nom;
                return res;
              }),
            ),
          );

          return forkJoin(allRequests);
        }),
      )
      .subscribe({
        next: (reservationsAvecNoms) => {
          this.reservationsList.data = reservationsAvecNoms;
        },
        error: (err) => console.error(err),
      });
  }

  onDelete(reservation: Reservation) {
    if (this.reservationToDelete == reservation) {
      this.reservationsService.deleteReservation(reservation).subscribe((deletion) => {
        alert('deletion ok');
      });
      this.loadReservation();
    } else {
      this.reservationToDelete = reservation;
      return;
    }
  }
}
