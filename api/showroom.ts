import type { VercelRequest, VercelResponse } from '@vercel/node';

function parseCSVRow(row: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    if (row[i] === '"') {
      inQuotes = !inQuotes;
    } else if (row[i] === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += row[i];
    }
  }
  result.push(current.trim());
  return result;
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!sheetId) {
    return res.status(500).json({ error: 'GOOGLE_SHEET_ID non configuré' });
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;
    const response = await fetch(url);

    if (!response.ok) {
      return res.status(502).json({ error: 'Impossible de récupérer le Google Sheet' });
    }

    const csv = await response.text();
    const rows = csv.trim().split('\n');

    if (rows.length < 2) {
      return res.status(200).json([]);
    }

    const headers = parseCSVRow(rows[0]).map(h => h.replace(/^"|"$/g, '').toLowerCase());

    const items = rows.slice(1)
      .map((row, index) => {
        const values = parseCSVRow(row).map(v => v.replace(/^"|"$/g, ''));
        const obj: Record<string, string | number> = { id: index + 1 };
        headers.forEach((header, i) => {
          obj[header] = values[i] ?? '';
        });
        return obj;
      })
      .filter(item => item.title && item.image);

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(items);
  } catch (error) {
    console.error('Erreur showroom API:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
