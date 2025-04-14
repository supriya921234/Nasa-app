import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface User {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root', // Optional: This automatically registers the service as a provider
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  register(name: string, email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/auth/register', { name, email, password });
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('http://localhost:8080/api/auth/login', { email, password }).pipe(
      tap((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>('/api/auth/logout', {}).pipe(
      tap(() => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }
}
