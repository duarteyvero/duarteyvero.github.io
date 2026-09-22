import { Result, Spin } from 'antd'
import type { ReactNode } from 'react'
import { useSession } from '@/hooks/useSession'
import { AdminShell } from './AdminShell'
import { LoginForm } from './LoginForm'
import { SignOutButton } from './SignOutButton'
import { useIsAdmin } from './useIsAdmin'

/** Muestra `children` solo a los novios; al resto, login o aviso */
export function RequireAuth({ children }: { children: ReactNode }) {
  const session = useSession()
  const userId = session.status === 'ready' ? session.session?.user.id : undefined
  const admin = useIsAdmin(userId)

  if (session.status === 'error') {
    return (
      <AdminShell>
        <Result
          status="warning"
          title="Supabase no está configurado"
          subTitle={session.error.message}
        />
      </AdminShell>
    )
  }

  if (session.status === 'ready' && !userId) {
    return (
      <AdminShell>
        <LoginForm />
      </AdminShell>
    )
  }

  if (session.status === 'loading' || admin === 'checking') {
    return (
      <AdminShell>
        <div className="flex justify-center py-24">
          <Spin size="large" />
        </div>
      </AdminShell>
    )
  }

  if (admin !== 'admin') {
    return (
      <AdminShell actions={<SignOutButton />}>
        <Result
          status={admin === 'error' ? 'error' : '403'}
          title={admin === 'error' ? 'No se ha podido comprobar tu acceso' : 'Sin acceso'}
          subTitle={
            admin === 'error'
              ? 'Recarga la página en unos segundos.'
              : 'Esta cuenta no tiene permiso para ver las respuestas.'
          }
        />
      </AdminShell>
    )
  }

  return children
}
