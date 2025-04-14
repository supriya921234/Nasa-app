import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../wishlist.service';
import { ApodResponse } from '../apod.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { SafeUrlPipe } from '../shared/safe-url.pipe';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, LoadingSpinnerComponent, SafeUrlPipe],
  template: `
    <div class="wishlist-container">
      <h2>Your Saved APODs</h2>
      
      <app-loading-spinner *ngIf="isLoading"></app-loading-spinner>

      <div *ngIf="!isLoading">
        <div *ngIf="wishlistItems.length > 0; else emptyState">
          <div *ngFor="let item of wishlistItems" class="wishlist-item">
            <h3>{{ item.title }}</h3>
            <p class="date">{{ item.date | date }}</p>
            
            <div *ngIf="item.media_type === 'image'">
              <img [src]="item.url" [alt]="item.title" class="apod-image">
            </div>
            <div *ngIf="item.media_type === 'video'">
              <iframe 
                [src]="item.url | safeUrl" 
                frameborder="0" 
                allowfullscreen
                class="apod-video">
              </iframe>
            </div>

            <button (click)="removeFromWishlist(item.date)" class="remove-btn">
              Remove
            </button>
          </div>
        </div>

        <ng-template #emptyState>
          <p class="empty-message">Your wishlist is empty</p>
        </ng-template>
      </div>
    </div>
  `,
  styles: `
    .wishlist-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .wishlist-item {
      margin-bottom: 2rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .apod-image {
      max-width: 100%;
      height: auto;
    }
    .apod-video {
      width: 100%;
      min-height: 400px;
    }
    .date {
      color: #666;
      font-style: italic;
    }
    .remove-btn {
      background: #dc3545;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 1rem;
    }
    .empty-message {
      text-align: center;
      font-size: 1.2rem;
      color: #666;
    }
  `
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
