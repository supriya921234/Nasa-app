import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';

  constructor(private router: Router, private http: HttpClient) {}

  register(name: string, email: string, password: string): Observable<boolean> {
    const payload: RegisterRequest = { name, email, password };
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, payload).pipe(
      map(res => {
        // Optionally, you can auto-login or just return true
        return true;
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error?.message || 'Registration failed');
      })
    );
  }

  login(email: string, password: string): Observable<{ token: string }> {
    const payload: LoginRequest = { email, password };
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, payload).pipe(
      map(res => {
        localStorage.setItem('jwtToken', res.token);
        return { token: res.token };
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err.error?.message || 'Invalid credentials');
      })
    );
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('jwtToken') !== null;
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }
}
