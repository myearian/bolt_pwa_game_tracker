import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Platform, Store, NewGame } from '../models/game.model';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <form (ngSubmit)="onSubmit()" #gameForm="ngForm" class="game-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" [(ngModel)]="game.title" name="title" required>
      </div>

      <div class="form-group">
        <label for="platform">Platform</label>
        <select id="platform" [(ngModel)]="game.platform" name="platform" required>
          <option *ngFor="let platform of platforms" [value]="platform">
            {{platform}}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="store">Store</label>
        <select id="store" [(ngModel)]="game.store" name="store" required>
          <option *ngFor="let store of stores" [value]="store">
            {{store}}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="purchaseDate">Purchase Date</label>
        <input type="date" id="purchaseDate" [(ngModel)]="game.purchaseDate" name="purchaseDate" required>
      </div>

      <div class="form-group">
        <label for="notes">Notes</label>
        <textarea id="notes" [(ngModel)]="game.notes" name="notes"></textarea>
      </div>

      <button type="submit" [disabled]="!gameForm.form.valid">Add Game</button>
    </form>
  `,
  styles: [`
    .game-form {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input, select, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      background: #1976d2;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background: #ccc;
    }
  `]
})
export class GameFormComponent {
  game: NewGame = {
    title: '',
    platform: Platform.PC,
    store: Store.Steam,
    purchaseDate: new Date().toISOString().split('T')[0],
    notes: ''
  };

  platforms = Object.values(Platform);
  stores = Object.values(Store);

  constructor(private gameService: GameService) {}

  onSubmit() {
    this.gameService.addGame(this.game);
    this.resetForm();
  }

  private resetForm() {
    this.game = {
      title: '',
      platform: Platform.PC,
      store: Store.Steam,
      purchaseDate: new Date().toISOString().split('T')[0],
      notes: ''
    };
  }
}