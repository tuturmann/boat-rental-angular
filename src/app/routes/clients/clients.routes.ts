import { Routes } from '@angular/router';

export const ClientRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./client-list/client-list').then((m) => m.ClientList),
  },
  {
    path: 'ajouter',
    loadComponent: () => import('./client-form/client-form').then((m) => m.ClientForm),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./client-detail/client-detail').then((m) => m.ClientDetail),
  },
];
