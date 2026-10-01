import { Component, inject } from '@angular/core';
import { ReservationsService } from '../services/reservations';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ClientsService } from '../../clients/services/clients';
import { CurrencyPipe } from '@angular/common';

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
  imports: [MatTableModule, RouterLink, MatButton, CurrencyPipe],
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
      // là c'est sensé s'afficher sans le nom car je le récupère après
      console.log(reservation);
      // là je récupère le nom avec le ClientsService getById
      reservation.forEach((reservation) => {
        this.clientsService.getClientById(reservation.client).subscribe((m) => {
          reservation.clientName = m.nom;
        });
      });
      // et là c'est sensé s'afficher avec le nom car je l'ai récupéré
      console.log(reservation);
      // là comme j'ai une MatTableDataSource, si j'affecte .data c'est sensé se rafraîchir sur la colonne Client
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
