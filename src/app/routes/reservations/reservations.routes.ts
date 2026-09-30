import { Routes } from '@angular/router';

export const ReservationsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./reservation-list/reservation-list').then((m) => m.ReservationList),
  },
  {
    path: 'ajouter',
    loadComponent: () =>
      import('./reservation-form/reservation-form').then((m) => m.ReservationForm),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./availability-search/availability-search').then((m) => m.AvailabilitySearch),
  },
];
