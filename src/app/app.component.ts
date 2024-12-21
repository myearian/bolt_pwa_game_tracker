import { Component } from '@angular/core';
import { GameFormComponent } from './components/game-form.component';
import { GameListComponent } from './components/game-list.component';
import { ThemeToggleComponent } from './components/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GameFormComponent, GameListComponent, ThemeToggleComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>Game Collection Tracker</h1>
        <app-theme-toggle></app-theme-toggle>
      </header>
      <app-game-form></app-game-form>
      <app-game-list></app-game-list>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    h1 {
      margin: 0;
      color: var(--primary-color);
    }
  `]
})
export class AppComponent {}