import { theme, type ThemeConfig } from 'antd'
import { colors, fonts } from './tokens'

/** Tema base: toda la app (panel /admin incluido) */
export const baseTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.green,
    colorLink: colors.green,
    colorText: colors.ink,
    colorTextSecondary: colors.muted,
    colorBgLayout: colors.cream,
    colorBorderSecondary: 'rgba(44, 79, 70, 0.1)',
    fontFamily: fonts.sans,
    borderRadius: 0,
    borderRadiusLG: 0,
    borderRadiusSM: 0,
  },
  components: {
    Statistic: { contentFontSize: 44 },
    Table: { headerBg: colors.cream, rowHoverBg: colors.cream },
  },
}

/** Tema de la sección RSVP (fondo oscuro) */
export const darkSectionTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: colors.gold,
    colorText: colors.white,
    colorTextPlaceholder: 'rgba(255, 255, 255, 0.45)',
    colorTextLabel: colors.mist,
    colorBorder: 'rgba(255, 255, 255, 0.35)',
    colorBgContainer: 'transparent',
    colorError: '#f0b4a8',
    fontSize: 15,
  },
  components: {
    Button: { primaryColor: colors.dark },
    Radio: { buttonSolidCheckedColor: colors.dark },
  },
}
