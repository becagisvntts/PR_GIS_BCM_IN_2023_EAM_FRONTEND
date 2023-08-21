// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const FooterContent = () => {
  // ** Var

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '0.5px solid #cfcfcf',
        paddingTop: '12px'
      }}
    >
      <Typography
        sx={{ fontSize: '0.9rem' }}
      >{`© ${new Date().getFullYear()} — BecaGIS. All Rights Reserved. `}</Typography>
    </Box>
  )
}

export default FooterContent
