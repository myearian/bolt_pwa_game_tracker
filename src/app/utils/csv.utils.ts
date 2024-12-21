export function parseCSV(csv: string): string[][] {
  const lines = csv.split('\n');
  return lines.map(line => 
    line.split(',').map(value => value.replace(/"/g, '').trim())
  );
}

export function generateCSV(headers: string[], rows: string[][]): string {
  return [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
}