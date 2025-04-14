import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../wishlist.service';
import { ApodResponse } from '../apod.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { SafeUrlPipe } from '../shared/safe-url.pipe';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, LoadingSpinnerComponent, SafeUrlPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishlistItems: ApodResponse[] = [];
  isLoading = false;

  constructor(private wishlistService: WishlistService) {
    this.loadWishlist();
  }

  loadWishlist() {
    this.isLoading = true;
    this.wishlistService.getWishlist().subscribe((items: ApodResponse[]) => {
      this.wishlistItems = items;
      this.isLoading = false;
    });
  }

  removeFromWishlist(date: string) {
    this.wishlistService.removeFromWishlist(date);
    this.wishlistItems = this.wishlistItems.filter(item => item.date !== date);
  }
}
