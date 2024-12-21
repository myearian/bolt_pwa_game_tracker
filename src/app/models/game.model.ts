export interface Game {
  id: string;
  title: string;
  platform: Platform;
  store: Store;
  purchaseDate: string;
  notes?: string;
}

export interface NewGame {
  title: string;
  platform: Platform;
  store: Store;
  purchaseDate: string;
  notes?: string;
}

export enum Platform {
  PC = 'PC',
  PlayStation = 'PlayStation',
  Xbox = 'Xbox',
  Nintendo = 'Nintendo'
}

export enum Store {
  Physical = 'Physical',
  Steam = 'Steam',
  EpicGames = 'Epic Games',
  GOG = 'GOG',
  PlayStationStore = 'PlayStation Store',
  NintendoStore = 'Nintendo Store',
  MicrosoftStore = 'Microsoft Store'
}