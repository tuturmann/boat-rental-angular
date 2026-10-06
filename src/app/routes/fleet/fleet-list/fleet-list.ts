import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FleetService } from '../services/fleet';
import { CapacitePipe } from '../../../shared/pipes/capacite/capacite-pipe';
import { LongueurPipe } from '../../../shared/pipes/longueur/longueur-pipe';
import { CurrencyPipe, NgClass } from '@angular/common';
import { PermisPipe } from '../../../shared/pipes/permis/permis-pipe';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { ReservationsService } from '../../reservations/services/reservations';
import { FormsModule } from '@angular/forms';

export interface Boat {
  id: string;
  nom: string;
  type: string;
  capacite: number;
  longueur: number;
  tarif: number;
  caution: number;
  permis: boolean;
}

@Component({
  selector: 'app-fleet-list',
  standalone: true,
  imports: [
    MatTableModule,
    CapacitePipe,
    LongueurPipe,
    CurrencyPipe,
    PermisPipe,
    RouterLink,
    MatButton,
    NgClass,
    FormsModule,
  ],
  styleUrl: './fleet-list.scss',
  templateUrl: './fleet-list.html',
})
export class FleetList implements OnInit {
  private fleetService = inject(FleetService);
  private reservationsService = inject(ReservationsService);

  // le MatTAbleDataSource permet de rafraîchir automatiquement quand on affect fleetListe.data à bateaux, ce que Boat<>[] ne fait pas
  public fleetList = new MatTableDataSource<Boat>([]);

  colonnes: string[] = [
    'nom',
    'type',
    'capacite',
    'longueur',
    'tarif',
    'caution',
    'permis',
    'actions',
  ];

  boatToEdit: Boat | null = null;
  boatToDelete: Boat | null = null;

  ngOnInit(): void {
    this.loadFleet();
  }

  loadFleet(): void {
    this.fleetService.getFleet().subscribe((bateaux) => {
      this.fleetList.data = bateaux;
    });
  }

  onEdit(boat: Boat) {
    if (this.boatToEdit === boat) {
      this.fleetService.updateBoat(boat).subscribe((m) => alert('Bateau maj OK'));
      this.boatToEdit = null;
    } else {
      this.boatToEdit = boat;
    }
  }

  onDelete(boat: Boat) {
    if (this.boatToDelete !== boat) {
      this.boatToDelete = boat;
      return;
    }

    this.reservationsService.getReservationByBoat(+boat.id).subscribe((reservations) => {
      const nbReservationsActives = reservations.length;

      if (nbReservationsActives > 0) {
        alert(
          'Vous ne pouvez pas supprimer ce bateau car au moins une réservation existe pour ce bateau.',
        );
        return;
      } else {
        this.fleetService.deleteBoat(boat)?.subscribe(() => {
          alert(`Le bateau ${boat.nom} a bien été supprimé`);
          this.loadFleet();
        });
      }
    });
  }

  recherche(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const valeur = inputElement.value.toLowerCase().trim();
    this.fleetList.filter = valeur;
  }
}
