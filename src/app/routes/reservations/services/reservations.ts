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
    clientId: number,
    bateauId: number,
    debut: Date,
    fin: Date,
    personnes: number,
    prix: number,
  ) {
    const body = { clientId, bateauId, debut, fin, personnes, prix, statut: 'À venir' };
    return this.http.post<Reservation>(`${this.baseUrl}/reservationsList`, body);
  }
}
