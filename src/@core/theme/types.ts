declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      dark: string
      main: string
      light: string
      bodyBg: string
      trackBg: string
      avatarBg: string
      darkPaperBg: string
      lightPaperBg: string
      tableHeaderBg: string
      blue: string
      cardBg: string
    }
    status: {
      create: string
      active: string
      complete: string
      late: string
    }
    boxBg: {
      main: string
      dark: string
      light: string
      default: string
    }
    transparent: {
      primary: string
      secondary: string
    }
  }

  interface PaletteOptions {
    customColors?: {
      dark?: string
      main?: string
      light?: string
      bodyBg?: string
      trackBg?: string
      avatarBg?: string
      darkPaperBg?: string
      lightPaperBg?: string
      tableHeaderBg?: string
      blue?: string
      cardBg?: string
    }
    status?: {
      create?: string
      active?: string
      complete?: string
      late?: string
    }
    boxBg: {
      main?: string
      dark?: string
      light?: string
      default?: string
    }
    transparent: {
      primary?: string
      secondary?: string
    }
  }
}

export {}
