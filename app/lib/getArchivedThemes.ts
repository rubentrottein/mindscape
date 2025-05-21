import { themesData } from "./ThemesData"

export function getArchivedThemes(): typeof themesData {
  const today = new Date().toISOString().slice(0, 10)
  console.log("TODAY ISO = ", today)
  return themesData.filter((theme) => theme.date < today)
}
