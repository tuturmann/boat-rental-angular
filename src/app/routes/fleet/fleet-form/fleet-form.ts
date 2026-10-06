import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { FleetService } from '../services/fleet';

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
  selector: 'app-fleet-form',
  styleUrl: './fleet-form.scss',
  templateUrl: './fleet-form.html',
})
export class FleetForm {
  private fleetService = inject(FleetService);
  boatForm!: FormGroup;

  ngOnInit() {
    this.boatForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      type: new FormControl(''),
      capacite: new FormControl('', [Validators.min(1)]),
      longueur: new FormControl('', [Validators.min(1)]),
      tarif: new FormControl('', [Validators.min(0)]),
      caution: new FormControl('', [Validators.min(0)]),
      permis: new FormControl(false),
    });
  }

  onSubmit() {
    if (this.boatForm.invalid) {
      return;
    }

    let submittedBoat = this.boatForm.value;

    this.fleetService
      .addBoat(
        submittedBoat.nom,
        submittedBoat.type,
        submittedBoat.capacite,
        submittedBoat.longueur,
        submittedBoat.tarif,
        submittedBoat.caution,
        submittedBoat.permis,
      )
      .subscribe();
  }
}
