import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../reservation-list/reservation-list';

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
    nom: string,
    type: string,
    capacite: number,
    longueur: number,
    tarif: number,
    caution: number,
    permis: boolean,
  ) {
    const body = { nom, type, capacite, longueur, tarif, caution, permis };
    return this.http.post<Reservation>(`${this.baseUrl}/reservationsList`, body);
  }
}
