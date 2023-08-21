// ** Type Imports
import { Palette } from '@mui/material'
import { Skin } from 'src/@core/layouts/types'

const DefaultPalette = (mode: Palette['mode'], skin: Skin): Palette => {
  // ** Vars
  const whiteColor = '#FFF'
  const lightColor = '51, 48, 60'
  const darkColor = '228, 230, 244'
  const darkPaperBgColor = '#2F3349'
  const blueColor = '#208CF0'
  const grayColor = '#8C9FB0'
  const greenColor = '#0DC96E'
  const redColor = '#EA5455'
  const mainColor = mode === 'light' ? lightColor : darkColor

  // **Customize
  const appColor = '#61325B'
  const appColorLighting = '#E8D2E5'
  const appColor2 = '#005CA9'
  const appColorLighting2 = '#D0EAFF'
  const appColorLighting3 = '#FEEFEB'

  const defaultBgColor = () => {
    if (skin === 'bordered' && mode === 'light') {
      return whiteColor
    } else if (skin === 'bordered' && mode === 'dark') {
      return darkPaperBgColor
    } else if (mode === 'light') {
      return '#F8F7FA'
    } else return '#25293C'
  }

  return {
    customColors: {
      main: appColor,
      dark: darkColor,
      light: lightColor,
      lightPaperBg: whiteColor,
      darkPaperBg: darkPaperBgColor,
      cardBg: mode === 'light' ? '#F4FDFE' : '#25293C',
      bodyBg: mode === 'light' ? '#F8F7FA' : '#25293C', // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === 'light' ? '#F1F0F2' : '#3B405B',
      avatarBg: mode === 'light' ? '#F6F6F7' : '#4A5072',
      tableHeaderBg: mode === 'light' ? '#F6F6F7' : '#4A5072'
    },
    status: {
      create: grayColor,
      active: blueColor,
      complete: greenColor,
      late: redColor
    },
    boxBg: {
      main: mode === 'light' ? appColor : '#25293C',
      dark: mode === 'light' ? appColor : '#3B405B',
      light: mode === 'light' ? appColor : '#4A5072',
      default: mode === 'light' ? appColor : '#4A5072'
    },
    transparent: {
      primary: appColorLighting,
      secondary: appColorLighting2
    },
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: appColor,
      main: appColor,
      dark: appColor,
      contrastText: whiteColor
    },
    secondary: {
      light: '#B2B4B8',
      main: '#A8AAAE',
      dark: '#949699',
      contrastText: whiteColor
    },
    error: {
      light: '#ED6F70',
      main: '#EA5455',
      dark: '#CE4A4B',
      contrastText: whiteColor
    },
    warning: {
      light: '#FFAB5A',
      main: '#FF9F43',
      dark: '#E08C3B',
      contrastText: whiteColor
    },
    info: {
      light: '#1FD5EB',
      main: '#00CFE8',
      dark: '#00B6CC',
      contrastText: whiteColor
    },
    success: {
      light: '#42CE80',
      main: '#28C76F',
      dark: '#23AF62',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: `rgba(${mainColor}, 0.95)`,
      secondary: `rgba(${mainColor}, 0.75)`,
      disabled: `rgba(${mainColor}, 0.45)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? whiteColor : darkPaperBgColor,
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  } as Palette
}

export default DefaultPalette
