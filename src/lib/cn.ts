import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Enseña a tailwind-merge los tamaños de texto propios de @theme,
// si no confunde `text-heading-xl` con un color y elimina clases válidas.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['micro', 'kicker', 'heading-display', 'heading-xl', 'heading-lg', 'heading-md'] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
