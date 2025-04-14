import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'apod', 
    loadComponent: () => import('./apod/apod.component').then(m => m.ApodComponent),
    canActivate: [AuthGuard]
  },
  { path: 'wishlist', 
    loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent),
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
