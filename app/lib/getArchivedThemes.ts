import themes from '../data/themes.json';

export function getArchivedThemes(): typeof themes {
  const today = new Date().toISOString().slice(0, 10)
  console.log("TODAY ISO = ", today)
  return themes.filter((theme) => theme.date < today)
}
