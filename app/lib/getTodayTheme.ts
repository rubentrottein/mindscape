import themes from '../data/themes.json';

export type Theme = {
  date: string;
  title: string;
  instructions: string;
  charLimit: number;
};

export function getTodayTheme(): Theme | null {
  const today = new Date().toISOString().slice(0, 10);
  return themes.find((t) => t.date === today) || null;
}
