import { darken, lighten } from '@/utils/index.js'

const theme = {
  primary: '#16BAAA',
  info: '#1E9FFF',
  success: '#16B777',
  warning: '#FFB800',
  error: '#FF5722'
}
const commonColor = {}
Object.keys(theme).forEach((item) => {
  commonColor[`${item}Color`] = theme[item]
  commonColor[`${item}ColorHover`] = lighten(theme[item], 6)
  commonColor[`${item}ColorPressed`] = darken(theme[item], 6)
})

const buttonText = [
  'textColorPrimary',
  'textColorHoverPrimary',
  'textColorPressedPrimary',
  'textColorFocusPrimary',
  'textColorDisabled',
  'textColorDisabledPrimary',
  'textColorInfo',
  'textColorHoverInfo',
  'textColorPressedInfo',
  'textColorFocusInfo',
  'textColorDisabledInfo',
  'textColorSuccess',
  'textColorHoverSuccess',
  'textColorPressedSuccess',
  'textColorFocusSuccess',
  'textColorDisabledSuccess',
  'textColorWarning',
  'textColorHoverWarning',
  'textColorPressedWarning',
  'textColorFocusWarning',
  'textColorDisabledWarning',
  'textColorError',
  'textColorHoverError',
  'textColorPressedError',
  'textColorFocusError',
  'textColorDisabledError'
]
const buttonTextColor = {}
buttonText.forEach((item) => {
  buttonTextColor[item] = 'rgba(255, 255, 255, .82)'
})

export const customTheme = {
  common: {
    ...commonColor
  },
  Button: {
    ...buttonTextColor
  },
  Scrollbar: {
    width: '8px',
    height: '8px',
    borderRadius: '8px'
  }
}
