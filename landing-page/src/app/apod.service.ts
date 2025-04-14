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
  private readonly API_KEY = 'DEMO_KEY'; // In production, use environment variable
  private readonly API_URL = 'https://api.nasa.gov/planetary/apod';

  constructor(private http: HttpClient) { }

  getTodayApod(): Observable<ApodResponse> {
    return this.http.get<ApodResponse>(`${this.API_URL}?api_key=${this.API_KEY}`);
  }

  getApodByDate(date: string): Observable<ApodResponse> {
    return this.http.get<ApodResponse>(`${this.API_URL}?api_key=${this.API_KEY}&date=${date}`);
  }
}
