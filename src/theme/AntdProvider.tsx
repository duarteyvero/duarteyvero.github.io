import { StyleProvider } from '@ant-design/cssinjs'
import { App, ConfigProvider } from 'antd'
import esES from 'antd/locale/es_ES'
import type { ReactNode } from 'react'
import { baseTheme } from './antd'

/**
 * Proveedores de antd. Solo lo usan los trozos que cargan en diferido (formulario RSVP y /admin),
 * así la invitación se pinta sin esperar a antd.
 */
export function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <StyleProvider layer>
      <ConfigProvider locale={esES} theme={baseTheme}>
        <App>{children}</App>
      </ConfigProvider>
    </StyleProvider>
  )
}
