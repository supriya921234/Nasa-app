import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" formControlName="email" required>
          <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
            Valid email is required
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" formControlName="password" required>
          <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
            Password is required
          </div>
        </div>

        <button type="submit" [disabled]="loginForm.invalid">Login</button>
      </form>
      <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
      <button *ngIf="isLoggedIn" (click)="router.navigate(['/apod'])">APOD Search</button>
    </div>
  `,
  styles: `
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2.5rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
    }
    
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      padding: 1rem;
    }
    
    h2 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #2c3e50;
    }
    
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    input:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
    
    button {
      width: 100%;
      background: #3498db;
      color: white;
      padding: 0.75rem;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    
    button:hover:not(:disabled) {
      background: #2980b9;
    }
    
    button:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoggedIn = true;
          this.router.navigate(['/apod']);
        },
        error: (err: Error | string) => {
          this.errorMessage = typeof err === 'string' ? err : 'Invalid credentials. Please try again.';
          console.error('Login failed', err);
        }
      });
    }
  }
}
