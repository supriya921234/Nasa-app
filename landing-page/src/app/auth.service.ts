import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', // Optional: This automatically registers the service as a provider
})
export class AuthService {
  private users: any[] = [];

  constructor(private router: Router) {}

  register(name: string, email: string, password: string): Observable<boolean> {
    const user = { name, email, password };
    this.users.push(user);
    return of(true);
  }

  login(email: string, password: string): Observable<{ token: string }> {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      // In a real app, this would call an API endpoint to get a JWT
      const token = 'mock-jwt-token';
      localStorage.setItem('currentUser', JSON.stringify({ ...user, token }));
      return of({ token });
    }
    return throwError(() => new Error('Invalid credentials'));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
}
