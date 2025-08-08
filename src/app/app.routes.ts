import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () => import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'bombas',
    loadComponent: () => import('./bombas/bombas.page').then( m => m.BombasPage)
  },
  {
    path: 'datos',
    loadComponent: () => import('./datos/datos.page').then( m => m.DatosPage)
  },
];
