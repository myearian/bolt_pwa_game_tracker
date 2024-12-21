import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(this.getInitialTheme());
  isDarkMode$ = this.isDarkMode.asObservable();

  private getInitialTheme(): boolean {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return JSON.parse(stored);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme(): void {
    const newValue = !this.isDarkMode.value;
    this.isDarkMode.next(newValue);
    localStorage.setItem('darkMode', JSON.stringify(newValue));
    this.updateThemeClass(newValue);
  }

  private updateThemeClass(isDark: boolean): void {
    document.documentElement.classList.toggle('dark-theme', isDark);
  }
}