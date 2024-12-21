export function fuzzySearch(text: string, query: string): boolean {
  const pattern = query.split('').map(char => 
    char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  ).join('.*');
  const regex = new RegExp(pattern, 'i');
  return regex.test(text);
}

export function searchGames(games: any[], searchTerm: string, fields: string[]): any[] {
  if (!searchTerm) return games;
  
  return games.filter(game => 
    fields.some(field => 
      fuzzySearch(String(game[field]), searchTerm)
    )
  );
}