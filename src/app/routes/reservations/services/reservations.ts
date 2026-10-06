import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../reservation-list/reservation-list';
import { Client } from '../../clients/client-list/client-list';
import { Boat } from '../../fleet/fleet-list/fleet-list';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000';

  getReservation() {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservationsList`);
  }

  getReservationByBoat(boatId: number) {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservationsList?bateau=${boatId}`);
  }

  getReservationByClient(clientId: number) {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservationsList?client=${clientId}`);
  }

  deleteReservation(reservation: Reservation) {
    return this.http.delete(`${this.baseUrl}/reservationsList/${reservation.id}`);
  }

  addReservation(
    client: number,
    bateau: number,
    debut: Date,
    fin: Date,
    personnes: number,
    prix: number,
  ) {
    const body = {
      client: client,
      bateau: bateau,
      debut: debut,
      fin: fin,
      personnes: +personnes,
      prix: +prix,
      statut: this.getStatut(debut, fin),
    };
    return this.http.post<Reservation>(`${this.baseUrl}/reservationsList`, body);
  }

  getStatut(dateDebut: Date, dateFin: Date): string {
    const nowMs: number = Date.now();
    const debutMs: number = dateDebut.getTime();
    const finMs: number = dateFin.getTime();

    if (debutMs > nowMs) {
      return 'À venir';
    } else {
      if (finMs >= nowMs) {
        return 'En cours';
      } else {
        return 'Terminée';
      }
    }
    return '';
  }
}
