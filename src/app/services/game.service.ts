import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Game, NewGame } from '../models/game.model';
import { getFromStorage, saveToStorage } from '../utils/storage.utils';
import { generateCSV, parseCSV } from '../utils/csv.utils';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly STORAGE_KEY = 'game-collection';
  private games = new BehaviorSubject<Game[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const stored = getFromStorage<Game[]>(this.STORAGE_KEY);
    if (stored) {
      this.games.next(stored);
    }
  }

  private saveToStorage(): void {
    saveToStorage(this.STORAGE_KEY, this.games.value);
  }

  getGames(): Observable<Game[]> {
    return this.games.asObservable();
  }

  addGame(newGame: NewGame): void {
    const game: Game = {
      ...newGame,
      id: crypto.randomUUID()
    };
    const currentGames = this.games.value;
    this.games.next([...currentGames, game]);
    this.saveToStorage();
  }

  deleteGame(id: string): void {
    const currentGames = this.games.value;
    this.games.next(currentGames.filter(game => game.id !== id));
    this.saveToStorage();
  }

  exportToCSV(): string {
    const headers = ['Title', 'Platform', 'Store', 'Purchase Date', 'Notes'];
    const rows = this.games.value.map(game => [
      game.title,
      game.platform,
      game.store,
      game.purchaseDate,
      game.notes || ''
    ]);
    
    return generateCSV(headers, rows);
  }

  importFromCSV(csv: string): void {
    const [headers, ...dataRows] = parseCSV(csv);
    
    const games: Game[] = dataRows.map(values => ({
      id: crypto.randomUUID(),
      title: values[0],
      platform: values[1] as any,
      store: values[2] as any,
      purchaseDate: values[3],
      notes: values[4]
    }));

    this.games.next(games);
    this.saveToStorage();
  }
}