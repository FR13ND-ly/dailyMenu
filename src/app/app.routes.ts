import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule) },
    { path: 'edit', loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditModule) },
    { path: '**', redirectTo: '' }
];
