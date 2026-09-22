import { cn } from '@/lib/cn'

type PhotoProps = {
  src: string
  alt: string
  fit?: 'cover' | 'contain'
  /** Solo para las fotos visibles al cargar la página */
  priority?: boolean
  className?: string
}

export function Photo({ src, alt, fit = 'cover', priority = false, className }: PhotoProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={cn(
        'block size-full',
        fit === 'cover' ? 'object-cover' : 'object-contain',
        className,
      )}
    />
  )
}
