import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClientsService } from '../services/clients';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

export interface Client {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  permisBateau: boolean;
  statut: "Actif" | "A risque";
}

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatTableModule, RouterLink, MatButton],
  styleUrl: './client-list.scss',
  templateUrl: './client-list.html',
})


export class ClientList implements OnInit {
  private clientsService = inject(ClientsService);
  public clientList = new MatTableDataSource<Client>([]);

  colonnes: string[] = ['nom', 'prenom', 'email', 'telephone', 'permisBateau','actions'];

  clientToEdit : Client | null = null;
  clientToDelete : Client | null = null;

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(): void {
  this.clientsService.getClient().subscribe(client => {
    this.clientList.data = client;
  });
}


  onDelete(client: Client){
    if (this.clientToDelete == client) {
      this.clientsService.deleteClient(client).subscribe(deletion => {console.log(deletion)});
      this.loadClient();
    }
    else {
      this.clientToDelete = client;
      return;      
    }
  }
}
