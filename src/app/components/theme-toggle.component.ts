import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="toggleTheme()" 
      class="theme-toggle"
      [attr.aria-label]="(isDarkMode$ | async) ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      {{ (isDarkMode$ | async) ? '☀️' : '🌙' }}
    </button>
  `,
  styles: [`
    .theme-toggle {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: background-color 0.3s;
    }
    .theme-toggle:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    :host-context(.dark-theme) .theme-toggle:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode$ = this.themeService.isDarkMode$;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Initial theme application
    this.isDarkMode$.subscribe(isDark => {
      document.documentElement.classList.toggle('dark-theme', isDark);
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}