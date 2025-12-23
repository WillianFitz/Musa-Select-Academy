import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/sales-page/sales-page.component').then(c => c.SalesPageComponent)
  },
  { path: '**', redirectTo: '' }
];