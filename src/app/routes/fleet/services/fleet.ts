import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Boat } from '../fleet-list/fleet-list';
import { ReservationsService } from '../../reservations/services/reservations';

@Injectable({
  providedIn: 'root',
})
export class FleetService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000';

  getFleet() {
    return this.http.get<Boat[]>(`${this.baseUrl}/fleetList`);
  }

  getBoatById(id: number) {
    return this.http.get<Boat>(`${this.baseUrl}/fleetList/${id}`);
  }

  deleteBoat(boat: Boat) {
    return this.http.delete(`${this.baseUrl}/fleetList/${boat.id}`);
  }

  updateBoat(boat: Boat) {
    return this.http.put<Boat>(`${this.baseUrl}/fleetList/${boat.id}`, boat);
  }

  addBoat(
    nom: string,
    type: string,
    capacite: number,
    longueur: number,
    tarif: number,
    caution: number,
    permis: boolean,
  ) {
    const body = { nom, type, capacite, longueur, tarif, caution, permis };
    return this.http.post<Boat>(`${this.baseUrl}/fleetList`, body);
  }
}
