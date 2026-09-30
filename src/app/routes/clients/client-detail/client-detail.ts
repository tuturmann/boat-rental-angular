import { Component, inject, Signal, signal } from '@angular/core';
import { Client } from '../client-list/client-list';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../services/clients';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-client-detail',
  styleUrl: './client-detail.scss',
  templateUrl: './client-detail.html',
})
export class ClientDetail {
  private route = inject(ActivatedRoute);
  private clientsService = inject(ClientsService);

  id: number | null = null;
  client = signal<Client | null>(null);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id) {
        this.clientsService.getClientById(this.id).subscribe((m) => {
          this.client.set(m);
          console.log(m);
        });
      }
    });
  }
}
