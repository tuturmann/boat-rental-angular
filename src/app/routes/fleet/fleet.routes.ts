import { Routes } from '@angular/router';

export const FleetRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./fleet-list/fleet-list').then(m => m.FleetList)
  },
  {
    path: 'ajouter',
    loadComponent: () => import('./fleet-form/fleet-form').then(m => m.FleetForm)
  }
];