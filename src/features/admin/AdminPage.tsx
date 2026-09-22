import { AntdProvider } from '@/theme/AntdProvider'
import { AdminDashboard } from './AdminDashboard'
import { RequireAuth } from './RequireAuth'

export function AdminPage() {
  return (
    <AntdProvider>
      <title>Panel · Duarte & Vero</title>
      <meta name="robots" content="noindex, nofollow" />
      <RequireAuth>
        <AdminDashboard />
      </RequireAuth>
    </AntdProvider>
  )
}
