import { AppBar, Dialog, IconButton, Toolbar } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'

export default function FullscreenVideoDialog({
  imagePath,
  openDialog,
  onClose
}: {
  imagePath: string
  openDialog: boolean
  onClose: () => void
}) {
  return (
    <Dialog open={openDialog} onClose={onClose} fullScreen>
      <IconButton
        sx={{
          color: 'primary.main',
          position: 'absolute',
          top: 10,
          left: 10,
          borderRadius: '50px',
          zIndex: 2
        }}
        onClick={onClose}
      >
        <IconifyIcon icon='material-symbols:close' fontWeight={'bold'} />
      </IconButton>
      <video width='100%' height='100%' controls>
        <source src={imagePath} />
        Your browser does not support the video tag.
      </video>
    </Dialog>
  )
}
