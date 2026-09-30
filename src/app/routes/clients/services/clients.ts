import { inject, Service } from '@angular/core';
import { Client } from '../client-list/client-list';
import { HttpClient } from '@angular/common/http';

@Service()
export class ClientsService {
    private http = inject(HttpClient);

    private baseUrl = 'http://localhost:3000';
  
    getClient() {
        return this.http.get<Client[]>(`${this.baseUrl}/clientList`);
    }
    
    getClientById(id: number) {
        return this.http.get<Client>(`${this.baseUrl}/clientList/${id}`);
    }
    
    deleteClient(client: Client){
        return this.http.delete(`${this.baseUrl}/clientList/${client.id}`);
    }
    
    addClient(nom: string, prenom: string, phone: number, permisBateau: number){
        const body = { nom, prenom, phone, permisBateau };
        alert("Client créé");
        return this.http.post<Client>(`${this.baseUrl}/clientList`, body);
    }
}
