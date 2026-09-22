/** Minúsculas y sin tildes: para buscar y comparar nombres ("Álvaro" = "alvaro") */
export const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
