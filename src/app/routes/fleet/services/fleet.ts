import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Boat } from '../fleet-list/fleet-list';

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000';

  getFleet() {
    return this.http.get<Boat[]>(`${this.baseUrl}/fleetList`);
  }
}
