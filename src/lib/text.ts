/** Minúsculas y sin tildes: para buscar y comparar nombres ("Álvaro" = "alvaro") */
export const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()

const MRZ_LENGTH = 32

/** Línea de pasaporte legible por máquina: ["P", "Boda", "Duarte"] → "P<<BODA<<DUARTE<<<<<<…" */
export const toMrz = (parts: readonly string[]) =>
  parts
    .map((part) => normalizeText(part).toUpperCase().replace(/\s+/g, ''))
    .join('<<')
    .padEnd(MRZ_LENGTH, '<')
