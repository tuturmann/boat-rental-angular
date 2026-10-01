import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { ClientsService } from '../services/clients';

@Component({
  imports: [
    MatFormFieldModule,
    MatSelect,
    MatSelectModule,
    MatOption,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButton,
  ],
  selector: 'app-client-form',
  styleUrl: './client-form.scss',
  templateUrl: './client-form.html',
})
export class ClientForm implements OnInit {
  private clientsService = inject(ClientsService);
  clientForm!: FormGroup;

  ngOnInit() {
    this.clientForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.required]),
      statut: new FormControl('Actif'), // Valeur par défaut basée sur ton type union
      permisBateau: new FormControl(false),
    });
  }

  onSubmit() {
    if (this.clientForm.invalid) {
      return;
    }

    let submittedClient = this.clientForm.value;

    this.clientsService
      .addClient(
        submittedClient.nom,
        submittedClient.prenom,
        submittedClient.email,
        submittedClient.telephone,
        submittedClient.permisBateau,
        submittedClient.statut,
      )
      .subscribe();
  }
}
