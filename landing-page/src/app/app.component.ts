import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="logo">{{title}}</h1>
        <div class="nav-links">
          <a routerLink="/apod" class="nav-link">APOD Search</a>
          <a *ngIf="!authService.isLoggedIn()" routerLink="/login" class="nav-link">Login</a>
          <a *ngIf="!authService.isLoggedIn()" routerLink="/register" class="nav-link">Register</a>
          <a *ngIf="authService.isLoggedIn()" routerLink="/wishlist" class="nav-link">Wishlist</a>
          <a *ngIf="authService.isLoggedIn()" (click)="logout()" class="nav-link" style="cursor: pointer">Logout</a>
        </div>
      </div>
    </nav>
    <router-outlet />
  `,
  styles: [`
    .navbar {
      background: #007bff; /* Changed to blue */
      backdrop-filter: blur(5px);
      padding: 1rem 2rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      color: white;
      margin: 0;
      font-size: 1.5rem;
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .nav-link:hover {
      background: rgba(255,255,255,0.1);
    }
    .nav-link.router-link-active {
      background: rgba(255,255,255,0.2);
    }
  `],
})
export class AppComponent {
  title = 'NASA App';

  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
