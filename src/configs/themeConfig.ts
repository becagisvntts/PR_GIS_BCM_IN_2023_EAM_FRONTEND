/**
 * Config
 * -------------------------------------------------------------------------------------
 * ! IMPORTANT: Make sure you clear the browser local storage in order to see the config changes in the template.
 * ! To clear local storage, you may refer https://www.leadshook.com/help/how-to-clear-local-storage-in-google-chrome-browser/.
 */

// ** MUI Imports
import { Direction } from '@mui/material'

// ** Types
import {
  Skin,
  Mode,
  AppBar,
  Footer,
  ContentWidth,
  VerticalNavToggle,
  HorizontalMenuToggle
} from 'src/@core/layouts/types'

type ThemeConfig = {
  skin: Skin
  mode: Mode
  appBar: AppBar
  footer: Footer
  navHidden: boolean
  appBarBlur: boolean
  direction: Direction
  templateName: string
  navCollapsed: boolean
  routingLoader: boolean
  disableRipple: boolean
  navigationSize: number
  navSubItemIcon: string
  menuTextTruncate: boolean
  contentWidth: ContentWidth
  disableCustomizer: boolean
  responsiveFontSizes: boolean
  collapsedNavigationSize: number
  horizontalMenuAnimation: boolean
  layout: 'vertical' | 'horizontal'
  verticalNavToggleType: VerticalNavToggle
  horizontalMenuToggle: HorizontalMenuToggle
  afterVerticalNavMenuContentPosition: 'fixed' | 'static'
  beforeVerticalNavMenuContentPosition: 'fixed' | 'static'
  toastPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
}

const themeConfig: ThemeConfig = {
  // ** Layout Configs
  templateName: 'BecaMaint',
  layout: 'vertical',
  mode: 'light' as Mode,
  direction: 'ltr',
  skin: 'default',
  contentWidth: 'boxed',
  footer: 'static',

  // ** Routing Configs
  routingLoader: true,

  // ** Navigation (Menu) Configs
  navHidden: false,
  menuTextTruncate: true,
  navSubItemIcon: 'tabler:circle',
  verticalNavToggleType: 'collapse',
  navCollapsed: false,
  navigationSize: 260,
  collapsedNavigationSize: 82,
  afterVerticalNavMenuContentPosition: 'fixed',
  beforeVerticalNavMenuContentPosition: 'fixed',
  horizontalMenuToggle: 'hover',
  horizontalMenuAnimation: true,

  // ** AppBar Configs
  appBar: 'static',
  appBarBlur: true,

  // ** Other Configs
  responsiveFontSizes: true,
  disableRipple: false,
  disableCustomizer: true,
  toastPosition: 'top-center'
}

export default themeConfig
