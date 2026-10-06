import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelectModule } from '@angular/material/select';
import { Client } from '../../clients/client-list/client-list';
import { ClientsService } from '../../clients/services/clients';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Boat } from '../../fleet/fleet-list/fleet-list';
import { FleetService } from '../../fleet/services/fleet';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ReservationsService } from '../services/reservations';
@Component({
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatSelectModule,
    MatOption,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatButton,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  selector: 'app-reservation-form',
  styleUrl: './reservation-form.scss',
  templateUrl: './reservation-form.html',
})
export class ReservationForm {
  reservationsForm!: FormGroup;
  reservationsControlClient = new FormControl<string | Client>('');
  reservationsControlBoat = new FormControl<string | Boat>('');

  reservationsService = inject(ReservationsService);
  clientsService = inject(ClientsService);
  fleetService = inject(FleetService);

  optionsClient: Client[] = [];
  optionsBoat: Boat[] = [];

  filteredOptionsClient!: Observable<Client[]>;
  filteredOptionsBoat!: Observable<Boat[]>;

  ngOnInit() {
    this.reservationsForm = new FormGroup({
      client: new FormControl('', [Validators.required]),
      bateau: new FormControl('', [Validators.required]),
      dateDebut: new FormControl('', [Validators.required]),
      dateFin: new FormControl('', [Validators.required]),
      nombrePersonnes: new FormControl('', [Validators.required]),
    });

    this.clientsService.getClient().subscribe((m) => (this.optionsClient = m));
    this.fleetService.getFleet().subscribe((m) => (this.optionsBoat = m));

    this.filteredOptionsClient = this.reservationsControlClient.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const nom = typeof value === 'string' ? value : value?.nom;
        return nom ? this._filterClient(nom as string) : this.optionsClient.slice();
      }),
    );

    this.filteredOptionsBoat = this.reservationsControlBoat.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const nom = typeof value === 'string' ? value : value?.nom;
        return nom ? this._filterBoat(nom as string) : this.optionsBoat.slice();
      }),
    );
  }

  private _filterClient(nom: string): Client[] {
    const filterValue = nom.toLowerCase();
    return this.optionsClient.filter((option) => option.nom.toLowerCase().includes(filterValue));
  }

  private _filterBoat(nom: string): Boat[] {
    const filterValue = nom.toLowerCase();
    return this.optionsBoat.filter((option) => option.nom.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.reservationsForm.invalid) {
      return;
    }

    let submittedReservation = this.reservationsForm.value;

    this.reservationsService
      .addReservation(
        submittedReservation.client,
        submittedReservation.bateau,
        submittedReservation.dateFin,
        submittedReservation.dateDebut,
        submittedReservation.nombrePersonnes,
        1, // a changer, c le prix total bateau journalier * nb jours
      )
      .subscribe();
  }

  displayClient(client: Client): string {
    return client && client.nom ? client.nom : '';
  }

  displayBoat(boat: Boat): string {
    return boat && boat.nom ? boat.nom : '';
  }
}
