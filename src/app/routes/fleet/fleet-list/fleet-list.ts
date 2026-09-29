import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FleetService } from '../services/fleet';

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
  imports: [MatTableModule],
  styleUrl: './fleet-list.scss',
  templateUrl: './fleet-list.html',
})


export class FleetList implements OnInit {
  private fleetService = inject(FleetService);
  // le MatTAbleDataSource permet de rafraîchir automatiquement quand on affect fleetListe.data à bateaux, ce que Boat<>[] ne fait pas
  public fleetList = new MatTableDataSource<Boat>([]);

  colonnes: string[] = ['nom', 'type', 'capacite', 'longueur', 'tarif', 'caution', 'permis'];


  ngOnInit(): void {
    this.fleetService.getFleet().subscribe(bateaux => {
      console.log(bateaux);
      this.fleetList.data = bateaux;
    })
  }
}
