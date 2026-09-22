import { theme, type ThemeConfig } from 'antd'
import { colors, fonts } from './tokens'

/** Tema base: toda la app (panel /admin incluido) */
export const baseTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.olive,
    colorLink: colors.olive,
    colorText: colors.ink,
    colorTextSecondary: colors.muted,
    colorBgLayout: colors.paper,
    colorBorderSecondary: 'rgba(37, 38, 31, 0.1)',
    fontFamily: fonts.sans,
    borderRadius: 0,
    borderRadiusLG: 0,
    borderRadiusSM: 0,
  },
  components: {
    Statistic: { contentFontSize: 44 },
    Table: { headerBg: colors.paper, rowHoverBg: colors.paper },
  },
}

/** Tema de la sección RSVP (fondo oscuro) */
export const darkSectionTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: colors.sage,
    colorText: colors.white,
    colorTextPlaceholder: 'rgba(251, 250, 246, 0.4)',
    colorTextLabel: colors.mist,
    colorBorder: 'rgba(251, 250, 246, 0.35)',
    colorBgContainer: 'transparent',
    colorError: '#f0b4a8',
    fontSize: 15,
  },
  components: {
    Button: { primaryColor: colors.dark },
    Radio: { buttonSolidCheckedColor: colors.dark },
  },
}
