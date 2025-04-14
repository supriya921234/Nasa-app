import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApodResponse } from './apod.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private http: HttpClient) {}

  getWishlist(): Observable<ApodResponse[]> {
    return this.http.get<ApodResponse[]>('/api/wishlist');
  }

  addToWishlist(apod: ApodResponse): Observable<ApodResponse> {
    return this.http.post<ApodResponse>('/api/wishlist', apod);
  }

  removeFromWishlist(date: string): Observable<void> {
    return this.http.delete<void>(`/api/wishlist/${date}`);
  }

  isInWishlist(date: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/wishlist/exists/${date}`);
  }
}
