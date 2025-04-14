import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApodService, ApodResponse } from '../apod.service';
import { WishlistService } from '../wishlist.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { SafeUrlPipe } from '../shared/safe-url.pipe';

@Component({
  selector: 'app-apod',
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent, SafeUrlPipe],
  template: `
    <div class="apod-container">
      <h2>Astronomy Picture of the Day</h2>
      
      <div class="search-controls">
        <input type="date" [(ngModel)]="selectedDate" (change)="getApodByDate()">
        <button (click)="getTodayApod()">Today</button>
      </div>

      <app-loading-spinner *ngIf="isLoading"></app-loading-spinner>

      <div *ngIf="!isLoading && apodData" class="apod-content">
        <h3>{{ apodData.title }}</h3>
        <p class="date">{{ apodData.date | date }}</p>
        
        <div *ngIf="apodData.media_type === 'image'; else videoBlock">
          <img [src]="apodData.url" [alt]="apodData.title" class="apod-image">
        </div>
        <ng-template #videoBlock>
          <iframe 
            [src]="apodData.url | safeUrl" 
            frameborder="0" 
            allowfullscreen
            class="apod-video">
          </iframe>
        </ng-template>

        <p class="explanation">{{ apodData.explanation }}</p>
        
        <div class="wishlist-controls">
          <button 
            *ngIf="!isInWishlist(apodData.date)"
            (click)="addToWishlist(apodData)"
            class="wishlist-btn">
            ♡ Add to Wishlist
          </button>
          <div *ngIf="isInWishlist(apodData.date)" class="in-wishlist">
            ✓ In Your Wishlist
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .apod-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .search-controls {
      margin: 1rem 0;
      display: flex;
      gap: 1rem;
    }
    .apod-content {
      margin-top: 1rem;
    }
    .apod-image {
      max-width: 100%;
      height: auto;
    }
    .apod-video {
      width: 100%;
      min-height: 500px;
    }
    .date {
      color: #666;
      font-style: italic;
    }
    .explanation {
      margin-top: 1rem;
      line-height: 1.6;
    }
    .wishlist-controls {
      margin-top: 1.5rem;
    }
    .wishlist-btn {
      background: #28a745;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .in-wishlist {
      color: #28a745;
      font-weight: bold;
    }
  `
})
export class ApodComponent {
  apodData?: ApodResponse;
  isLoading = false;
  selectedDate = new Date().toISOString().split('T')[0];

  constructor(
    private apodService: ApodService,
    private wishlistService: WishlistService
  ) {
    this.getTodayApod();
  }

  isInWishlist(date: string): boolean {
    let isInWishlist = false;
    this.wishlistService.isInWishlist(date).subscribe((result: boolean) => {
      isInWishlist = result;
    });
    return isInWishlist;
  }

  addToWishlist(apod: ApodResponse): void {
    this.wishlistService.addToWishlist(apod);
  }

  getTodayApod() {
    this.fetchApod(this.apodService.getTodayApod());
  }

  getApodByDate() {
    this.fetchApod(this.apodService.getApodByDate(this.selectedDate));
  }

  private fetchApod(apodObservable: Observable<ApodResponse>) {
    this.isLoading = true;
    apodObservable.subscribe({
      next: (data: ApodResponse) => {
        this.apodData = data;
        this.isLoading = false;
      },
      error: (err: Error) => {
        console.error('Error fetching APOD:', err);
        this.isLoading = false;
      }
    });
  }
}
