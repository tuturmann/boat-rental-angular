import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Boat } from '../fleet-list/fleet-list';

@Injectable({
  providedIn: 'root',
})
export class FleetService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000';

  getFleet() {
    return this.http.get<Boat[]>(`${this.baseUrl}/fleetList`);
  }

  deleteBoat(boat: Boat) {
    return this.http.delete(`${this.baseUrl}/fleetList/${boat.id}`);
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
