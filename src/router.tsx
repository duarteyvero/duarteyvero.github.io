import { createBrowserRouter, Navigate } from 'react-router'
import { InvitationPage } from '@/features/invitation/InvitationPage'

export const router = createBrowserRouter([
  { path: '/', element: <InvitationPage /> },
  {
    path: '/admin',
    HydrateFallback: () => null,
    // Carga diferida: los invitados nunca descargan el código del panel
    lazy: async () => {
      const { AdminPage } = await import('@/features/admin/AdminPage')
      return { Component: AdminPage }
    },
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
