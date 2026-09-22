import type { ComponentProps } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

/** Aparece con un fundido suave al entrar en pantalla */
export function Reveal({ className, ...props }: ComponentProps<'div'>) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,translate] duration-900 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-[25px] opacity-0',
        className,
      )}
      {...props}
    />
  )
}
