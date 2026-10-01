import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./routes/accueil/accueil').then((m) => m.Accueil),
      },
      {
        path: 'fleet',
        loadChildren: () => import('./routes/fleet/fleet.routes').then((m) => m.FleetRoutes),
      },
      {
        path: 'clients',
        loadChildren: () => import('./routes/clients/clients.routes').then((m) => m.ClientRoutes),
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('./routes/reservations/reservations.routes').then((m) => m.ReservationsRoutes),
      },
    ],
  },
];
