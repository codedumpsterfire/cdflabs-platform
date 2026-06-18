import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Viewer3DComponent } from '../../components/3d-viewer/3d-viewer.component';
import { DataLoaderService, Listing } from '../../../services/data-loader.service';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [CommonModule, RouterModule, Viewer3DComponent],
  template: `
    <div class="listing-container">
      <button class="get-all-btn" (click)="toggleListings()">
        {{ showListings ? 'Hide Listings' : 'Get All' }}
      </button>

      <div class="listings-wrapper" *ngIf="showListings">
        <!-- Left side listings -->
        <div class="listings-column left-column">
          <div class="listing-card" *ngFor="let listing of listings">
            <div class="card-header">
              <h3 class="listing-name">{{ listing.name }}</h3>
              <span class="badge" [ngClass]="'status-' + listing.status.toLowerCase()">{{ listing.status }}</span>
            </div>
            <p class="listing-type">{{ listing.listing_type }}</p>
            <p class="listing-summary">{{ listing.summary }}</p>
            <p class="listing-description">{{ listing.description }}</p>
            <div class="listing-meta">
              <span class="ai-usage" [ngClass]="'ai-' + listing.ai_usage.toLowerCase()">{{ listing.ai_usage }}</span>
              <span class="state">{{ listing.state }}</span>
            </div>
            <div class="listing-links">
              <a *ngIf="listing.personal_site_url" [href]="listing.personal_site_url" target="_blank" class="link">
                <span class="icon">🌐</span> Website
              </a>
              <a *ngIf="listing.instagram_url" [href]="listing.instagram_url" target="_blank" class="link">
                <span class="icon">📱</span> Instagram
              </a>
            </div>
          </div>
        </div>

        <!-- Center 3D model -->
        <div class="center-model">
          <app-3d-viewer modelPath="/assets/models/mapscene.gltf"></app-3d-viewer>
        </div>

        <!-- Right side listings -->
        <div class="listings-column right-column">
          <div class="listing-card" *ngFor="let listing of rightListings">
            <div class="card-header">
              <h3 class="listing-name">{{ listing.name }}</h3>
              <span class="badge" [ngClass]="'status-' + listing.status.toLowerCase()">{{ listing.status }}</span>
            </div>
            <p class="listing-type">{{ listing.listing_type }}</p>
            <p class="listing-summary">{{ listing.summary }}</p>
            <p class="listing-description">{{ listing.description }}</p>
            <div class="listing-meta">
              <span class="ai-usage" [ngClass]="'ai-' + listing.ai_usage.toLowerCase()">{{ listing.ai_usage }}</span>
              <span class="state">{{ listing.state }}</span>
            </div>
            <div class="listing-links">
              <a *ngIf="listing.personal_site_url" [href]="listing.personal_site_url" target="_blank" class="link">
                <span class="icon">🌐</span> Website
              </a>
              <a *ngIf="listing.instagram_url" [href]="listing.instagram_url" target="_blank" class="link">
                <span class="icon">📱</span> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Default model when not showing listings -->
      <div class="default-model" *ngIf="!showListings">
        <app-3d-viewer modelPath="/assets/models/mapscene.gltf"></app-3d-viewer>
      </div>
    </div>
  `,
  styles: [`
    .listing-container {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      align-items: center;
    }

    .get-all-btn {
      background: rgba(0, 255, 136, 0.2);
      color: #00ff88;
      border: 2px solid #00ff88;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      font-family: 'Courier New', monospace;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
      text-shadow: 0 0 5px rgba(0, 255, 136, 0.5);
    }

    .get-all-btn:hover {
      background: rgba(0, 255, 136, 0.3);
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.6);
      transform: scale(1.05);
    }

    .get-all-btn:active {
      transform: scale(0.95);
    }

    .listings-wrapper {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
      align-items: start;
    }

    .listings-column {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      max-height: 800px;
      overflow-y: auto;
      padding-right: 1rem;
    }

    .listings-column::-webkit-scrollbar {
      width: 6px;
    }

    .listings-column::-webkit-scrollbar-track {
      background: rgba(0, 255, 136, 0.1);
      border-radius: 3px;
    }

    .listings-column::-webkit-scrollbar-thumb {
      background: rgba(0, 255, 136, 0.4);
      border-radius: 3px;
    }

    .listings-column::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 255, 136, 0.6);
    }

    .center-model {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
    }

    .default-model {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .listing-card {
      background: rgba(20, 20, 30, 0.6);
      border: 1px solid rgba(0, 255, 136, 0.3);
      border-radius: 8px;
      padding: 1.5rem;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      box-shadow: 0 0 10px rgba(0, 255, 136, 0.1);
    }

    .listing-card:hover {
      border-color: rgba(0, 255, 136, 0.6);
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
      transform: translateY(-5px);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }

    .listing-name {
      margin: 0;
      color: #00ff88;
      font-size: 1.1rem;
      font-weight: 700;
      text-shadow: 0 0 5px rgba(0, 255, 136, 0.5);
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
      text-shadow: 0 0 3px rgba(0, 255, 136, 0.5);
    }

    .badge.status-verified {
      background: rgba(0, 255, 136, 0.2);
      color: #00ff88;
      border: 1px solid rgba(0, 255, 136, 0.5);
    }

    .badge.status-pending {
      background: rgba(255, 215, 0, 0.2);
      color: #ffd700;
      border: 1px solid rgba(255, 215, 0, 0.5);
    }

    .listing-type {
      margin: 0.5rem 0;
      color: #00d4ff;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .listing-summary {
      margin: 0.5rem 0;
      color: #00ff88;
      font-size: 0.95rem;
      font-weight: 600;
      line-height: 1.4;
    }

    .listing-description {
      margin: 0.75rem 0;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.85rem;
      line-height: 1.5;
    }

    .listing-meta {
      display: flex;
      gap: 0.75rem;
      margin: 1rem 0;
      flex-wrap: wrap;
    }

    .ai-usage {
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .ai-usage.ai-ethical_ai {
      background: rgba(0, 255, 136, 0.1);
      color: #00ff88;
      border: 1px solid rgba(0, 255, 136, 0.4);
    }

    .ai-usage.ai-no_ai {
      background: rgba(100, 255, 150, 0.1);
      color: #64ff96;
      border: 1px solid rgba(100, 255, 150, 0.4);
    }

    .state {
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      background: rgba(0, 212, 255, 0.1);
      color: #00d4ff;
      border: 1px solid rgba(0, 212, 255, 0.4);
    }

    .listing-links {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
    }

    .link {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.5rem 0.75rem;
      border-radius: 4px;
      background: rgba(0, 255, 136, 0.1);
      color: #00ff88;
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 600;
      transition: all 0.2s ease;
      border: 1px solid rgba(0, 255, 136, 0.3);
    }

    .link:hover {
      background: rgba(0, 255, 136, 0.2);
      box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    }

    .icon {
      font-size: 1rem;
    }

    @media (max-width: 1200px) {
      .listings-wrapper {
        grid-template-columns: 1fr;
      }

      .listings-column {
        max-height: 400px;
      }
    }
  `],
})
export class ListingComponent {
  showListings = false;
  listings: Listing[] = [];
  leftListings: Listing[] = [];
  rightListings: Listing[] = [];

  constructor() {
    this.loadData();
  }

  private loadFakeData(): void {
    this.listings = [
      {
        id: '10000000-0000-0000-0000-000000000001',
        user_id: '00000000-0000-0000-0000-000000000001',
        listing_type: 'DEVELOPER',
        name: 'CDFxLabs',
        summary: 'Indie dev and tech consultancy. Human-built software only.',
        description: 'Full stack developer building tools for the creative community. No generative AI used in client deliverables.',
        ai_usage: 'ETHICAL_AI',
        state: 'IL',
        personal_site_url: 'https://cdflabs.dev',
        instagram_url: 'https://instagram.com/codedumpsterfire',
        status: 'VERIFIED',
      },
      {
        id: '10000000-0000-0000-0000-000000000002',
        user_id: '00000000-0000-0000-0000-000000000002',
        listing_type: 'DESIGNER',
        name: 'Creative Studio',
        summary: 'UI/UX designer specializing in digital experiences.',
        description: 'Creating beautiful and functional digital designs with a human touch. Focused on user-centered design principles.',
        ai_usage: 'ETHICAL_AI',
        state: 'CA',
        personal_site_url: 'https://example.com',
        instagram_url: 'https://instagram.com/example',
        status: 'VERIFIED',
      },
      {
        id: '10000000-0000-0000-0000-000000000003',
        user_id: '00000000-0000-0000-0000-000000000003',
        listing_type: 'DEVELOPER',
        name: 'Tech Innovations',
        summary: 'Custom software solutions for businesses.',
        description: 'Building scalable backend systems and cloud infrastructure for enterprise clients. 100% human-coded.',
        ai_usage: 'NO_AI',
        state: 'NY',
        personal_site_url: 'https://example2.com',
        instagram_url: 'https://instagram.com/example2',
        status: 'VERIFIED',
      },
      {
        id: '10000000-0000-0000-0000-000000000004',
        user_id: '00000000-0000-0000-0000-000000000004',
        listing_type: 'ARTIST',
        name: '3D Art Studio',
        summary: 'Hand-crafted 3D models and animations.',
        description: 'Creating stunning 3D assets for games, films, and interactive experiences. All work manually created.',
        ai_usage: 'ETHICAL_AI',
        state: 'TX',
        personal_site_url: 'https://example3.com',
        instagram_url: 'https://instagram.com/example3',
        status: 'VERIFIED',
      },
      {
        id: '10000000-0000-0000-0000-000000000005',
        user_id: '00000000-0000-0000-0000-000000000005',
        listing_type: 'CONSULTANT',
        name: 'Strategy Experts',
        summary: 'Business and tech strategy consulting.',
        description: 'Helping companies navigate digital transformation with human expertise and real-world experience.',
        ai_usage: 'ETHICAL_AI',
        state: 'WA',
        personal_site_url: 'https://example4.com',
        instagram_url: 'https://instagram.com/example4',
        status: 'VERIFIED',
      },
      {
        id: '10000000-0000-0000-0000-000000000006',
        user_id: '00000000-0000-0000-0000-000000000006',
        listing_type: 'DEVELOPER',
        name: 'Web Masters',
        summary: 'Custom web development and optimization.',
        description: 'Building performant, accessible websites with modern technologies and best practices.',
        ai_usage: 'ETHICAL_AI',
        state: 'CO',
        personal_site_url: 'https://example5.com',
        instagram_url: 'https://instagram.com/example5',
        status: 'VERIFIED',
      },
    ];

    this.distributeListings();
  }

  private async loadData(): Promise<void> {
  try {
    const response = await fetch('http://localhost:8080/api/listings');
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetching listings data...', data);
    if (data !== null) {
      this.listings = data;
      this.distributeListings();
    } else {
      console.warn('Received null data for listings or there was an uncaught error');
    }
  } catch (error) {
    console.error('Error fetching listings:', error);
  }
}

  private distributeListings(): void {
    this.leftListings = [];
    this.rightListings = [];

    this.listings.forEach((listing, index) => {
      if (index % 2 === 0) {
        this.leftListings.push(listing);
      } else {
        this.rightListings.push(listing);
      }
    });
  }

  toggleListings(): void {
    this.showListings = !this.showListings;
  }
}
