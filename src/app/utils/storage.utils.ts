export function getFromStorage<T>(key: string): T | null {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
}

export function saveToStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}