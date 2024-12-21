import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game } from '../models/game.model';
import { GameService } from '../services/game.service';
import { searchGames } from '../utils/search.utils';
import { sortGames, SortConfig } from '../utils/sort.utils';
import { GameCardComponent } from './game-card.component';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule, GameCardComponent],
  template: `
    <div class="game-list">
      <div class="controls">
        <div class="search-box">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            placeholder="Search games..."
            (input)="updateFilteredGames()"
            class="search-input"
          >
        </div>
        <div class="import-export">
          <button (click)="exportGames()">Export CSV</button>
          <label class="import-label">
            Import CSV
            <input
              type="file"
              (change)="importGames($event)"
              accept=".csv"
              class="file-input"
            >
          </label>
        </div>
      </div>

      <!-- Table View -->
      <table class="desktop-view">
        <thead>
          <tr>
            <th *ngFor="let column of columns" 
                (click)="sort(column.key)"
                [class.sorted]="sortConfig.column === column.key"
                [class.asc]="sortConfig.direction === 'asc'"
                [class.desc]="sortConfig.direction === 'desc'"
            >
              {{column.label}}
              <span class="sort-indicator">⌃</span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let game of filteredGames">
            <td>{{game.title}}</td>
            <td>{{game.platform}}</td>
            <td>{{game.store}}</td>
            <td>{{game.purchaseDate | date}}</td>
            <td>{{game.notes}}</td>
            <td>
              <button (click)="deleteGame(game.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
          <tr *ngIf="filteredGames.length === 0">
            <td colspan="6" class="no-results">No games found</td>
          </tr>
        </tbody>
      </table>

      <!-- Card View -->
      <div class="mobile-view">
        <app-game-card
          *ngFor="let game of filteredGames"
          [game]="game"
          (onDelete)="deleteGame($event)"
        ></app-game-card>
        <div *ngIf="filteredGames.length === 0" class="no-results">
          No games found
        </div>
      </div>
    </div>
  `,
  styles: [`
    .game-list {
      margin: 20px;
    }
    .controls {
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .search-input {
      padding: 8px;
      width: 300px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .import-export {
      display: flex;
      gap: 10px;
    }
    .import-label {
      cursor: pointer;
      padding: 8px 16px;
      background: #1976d2;
      color: white;
      border-radius: 4px;
    }
    .file-input {
      display: none;
    }
    
    /* Table Styles */
    .desktop-view {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
      background-color: #f5f5f5;
      cursor: pointer;
      user-select: none;
      position: relative;
    }
    td {
      padding: 10px;
      border: 1px solid #ddd;
    }
    .sort-indicator {
      display: inline-block;
      margin-left: 5px;
      transition: transform 0.2s;
    }
    th.sorted.desc .sort-indicator {
      transform: rotate(180deg);
    }
    .no-results {
      text-align: center;
      font-style: italic;
      color: #666;
      padding: 20px;
    }
    .delete-btn {
      background: #dc3545;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }

    /* Responsive Layout */
    .mobile-view {
      display: none;
    }

    @media (max-width: 768px) {
      .desktop-view {
        display: none;
      }
      .mobile-view {
        display: block;
      }
      .search-input {
        width: 100%;
      }
      .controls {
        flex-direction: column;
        align-items: stretch;
      }
      .import-export {
        justify-content: stretch;
      }
      .import-export button,
      .import-label {
        flex: 1;
        text-align: center;
      }
    }
  `]
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  searchTerm = '';
  
  columns = [
    { key: 'title', label: 'Title' },
    { key: 'platform', label: 'Platform' },
    { key: 'store', label: 'Store' },
    { key: 'purchaseDate', label: 'Purchase Date' },
    { key: 'notes', label: 'Notes' }
  ];

  sortConfig: SortConfig = {
    column: 'title',
    direction: 'asc'
  };

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getGames().subscribe(games => {
      this.games = games;
      this.updateFilteredGames();
    });
  }

  updateFilteredGames() {
    let filtered = searchGames(this.games, this.searchTerm, ['title', 'platform', 'store', 'notes']);
    this.filteredGames = sortGames(filtered, this.sortConfig);
  }

  sort(column: string) {
    if (this.sortConfig.column === column) {
      this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortConfig = { column, direction: 'asc' };
    }
    this.updateFilteredGames();
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(id);
  }

  exportGames() {
    const csv = this.gameService.exportToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'game-collection.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  importGames(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      this.gameService.importFromCSV(csv);
    };
    reader.readAsText(file);
  }
}