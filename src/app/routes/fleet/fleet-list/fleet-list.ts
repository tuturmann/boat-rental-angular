import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FleetService } from '../services/fleet';
import { CapacitePipe } from '../../../shared/pipes/capacite/capacite-pipe';
import { LongueurPipe } from '../../../shared/pipes/longueur/longueur-pipe';
import { CurrencyPipe } from '@angular/common';
import { PermisPipe } from '../../../shared/pipes/permis/permis-pipe';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

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
  imports: [MatTableModule, CapacitePipe, LongueurPipe, CurrencyPipe, PermisPipe, RouterLink, MatButton],
  styleUrl: './fleet-list.scss',
  templateUrl: './fleet-list.html',
})


export class FleetList implements OnInit {
  private fleetService = inject(FleetService);
  // le MatTAbleDataSource permet de rafraîchir automatiquement quand on affect fleetListe.data à bateaux, ce que Boat<>[] ne fait pas
  public fleetList = new MatTableDataSource<Boat>([]);

  colonnes: string[] = ['nom', 'type', 'capacite', 'longueur', 'tarif', 'caution', 'permis', 'actions'];

  boatToEdit : Boat | null = null;
  boatToDelete : Boat | null = null;

  ngOnInit(): void {
    this.loadFleet();
  }

  loadFleet(): void {
  this.fleetService.getFleet().subscribe(bateaux => {
    this.fleetList.data = bateaux;
  });
}

  onEdit(boat: Boat){
    this.boatToEdit = boat;
  }

  onDelete(boat: Boat){
    if (this.boatToDelete == boat) {
      this.fleetService.deleteBoat(boat).subscribe(deletion => {console.log(deletion)});
      this.loadFleet();
    }
    else {
      this.boatToDelete = boat;
      return;      
    }
  }
}
