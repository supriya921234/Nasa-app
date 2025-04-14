import { Injectable } from '@angular/core';
import { ApodResponse } from './apod.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly WISHLIST_KEY = 'apod_wishlist';

  constructor() { }

  getWishlist(): ApodResponse[] {
    const wishlist = localStorage.getItem(this.WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  }

  addToWishlist(apod: ApodResponse): void {
    const wishlist = this.getWishlist();
    if (!this.isInWishlist(apod.date)) {
      wishlist.push(apod);
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(wishlist));
    }
  }

  removeFromWishlist(date: string): void {
    const wishlist = this.getWishlist();
    const updated = wishlist.filter(item => item.date !== date);
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(updated));
  }

  isInWishlist(date: string): boolean {
    return this.getWishlist().some(item => item.date === date);
  }
}
