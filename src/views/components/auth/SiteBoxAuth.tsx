import { Box, Card, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import IconifyIcon from 'src/@core/components/icon'
import LocalizationService from 'src/services/common/LocalizationService'

export default function SiteBoxAuth({ pageTitle }: { pageTitle: string }) {
  const smallScreen = useMediaQuery(useTheme().breakpoints.down('md'))
  const { i18n } = useTranslation()
  const iconLang = localStorage.getItem('i18nextLng') || 'vi'

  const handleLangItemClick = (lang: 'en' | 'vi') => {
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language)
  }, [i18n.language])

  const theme = useTheme()

  return (
    <Card
      elevation={smallScreen ? 0 : 3}
      sx={{
        display: 'flex',
        alignItems: smallScreen ? 'center' : 'end',
        flexDirection: 'column',
        backgroundColor: smallScreen ? 'transparent !important' : theme.palette.transparent.primary,
        width: '100%',
        maxWidth: 500,
        p: [8, smallScreen ? 0 : 8],
        borderRadius: 2,
        position: 'relative'
      }}
    >
      <Box>
        <img src='/images/icon.png' height={150} width={'auto'} />
      </Box>
      <Typography sx={{ fontWeight: 600, fontSize: '2.5rem', color: theme.palette.primary.main }}>
        {LocalizationService.translate('appTitle')}
      </Typography>
      <Typography
        sx={{
          mb: 4,
          fontWeight: 500,
          fontSize: '1.3125rem',
          color: theme.palette.primary.main
        }}
      >
        {LocalizationService.translate('appDescription')}
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '1.75rem',
          color: theme.palette.primary.main
        }}
      >
        {pageTitle}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          borderRadius: 20,
          width: '36px',
          height: '36px',
          background: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <IconButton
          onClick={() => {
            handleLangItemClick(i18n.language == 'vi' ? 'en' : 'vi')
          }}
        >
          <IconifyIcon icon={iconLang == 'vi' ? 'flagpack:vn' : 'flagpack:us'} width={'20px'} />
        </IconButton>
      </Box>
    </Card>
  )
}
