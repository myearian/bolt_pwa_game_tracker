export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  column: string;
  direction: SortDirection;
}

export function sortGames<T>(games: T[], config: SortConfig): T[] {
  return [...games].sort((a: any, b: any) => {
    const aVal = a[config.column];
    const bVal = b[config.column];
    
    const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    return config.direction === 'asc' ? comparison : -comparison;
  });
}