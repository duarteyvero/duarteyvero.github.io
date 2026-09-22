export type CsvColumn<T> = { header: string; value: (row: T) => string | number | boolean | null }

const escape = (value: string | number | boolean | null) => {
  const text =
    value === null ? '' : typeof value === 'boolean' ? (value ? 'Sí' : 'No') : String(value)
  return /[";\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

/** Descarga un CSV listo para abrir con Excel en español (separador `;` y BOM UTF-8) */
export function downloadCsv<T>(filename: string, rows: readonly T[], columns: CsvColumn<T>[]) {
  const lines = [
    columns.map((column) => escape(column.header)).join(';'),
    ...rows.map((row) => columns.map((column) => escape(column.value(row))).join(';')),
  ]

  const blob = new Blob(['﻿', lines.join('\r\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = Object.assign(document.createElement('a'), { href: url, download: filename })
  link.click()
  URL.revokeObjectURL(url)
}
