import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApodResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApodService {
  private readonly BACKEND_API_URL = '/api/apod';

  constructor(private http: HttpClient) { }

  getTodayApod(): Observable<ApodResponse> {
    const today = new Date().toISOString().split('T')[0];
    return this.http.get<ApodResponse>(`${this.BACKEND_API_URL}?date=${today}`);
  }

  getApodByDate(date: string): Observable<ApodResponse> {
    return this.http.get<ApodResponse>(`${this.BACKEND_API_URL}?date=${date}`);
  }
}
