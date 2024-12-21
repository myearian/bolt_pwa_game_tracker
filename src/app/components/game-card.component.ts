import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-card">
      <h3 class="title">{{game.title}}</h3>
      <div class="details">
        <div class="detail">
          <span class="label">Platform:</span>
          <span class="value">{{game.platform}}</span>
        </div>
        <div class="detail">
          <span class="label">Store:</span>
          <span class="value">{{game.store}}</span>
        </div>
        <div class="detail">
          <span class="label">Purchase Date:</span>
          <span class="value">{{game.purchaseDate | date}}</span>
        </div>
        <div class="detail" *ngIf="game.notes">
          <span class="label">Notes:</span>
          <span class="value">{{game.notes}}</span>
        </div>
      </div>
      <button (click)="onDelete.emit(game.id)" class="delete-btn">Delete</button>
    </div>
  `,
  styles: [`
    .game-card {
      background: white;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .title {
      margin: 0 0 12px 0;
      color: #1976d2;
      font-size: 1.2rem;
    }
    .details {
      display: grid;
      gap: 8px;
    }
    .detail {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 8px;
    }
    .label {
      color: #666;
      font-weight: 500;
    }
    .value {
      color: #333;
    }
    .delete-btn {
      width: 100%;
      margin-top: 12px;
      padding: 8px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class GameCardComponent {
  @Input() game!: Game;
  @Output() onDelete = new EventEmitter<string>();
}