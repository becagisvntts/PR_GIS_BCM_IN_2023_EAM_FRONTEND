import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import IconifyIcon from 'src/@core/components/icon'
import Translations from 'src/layouts/components/Translations'
import LocalizationService from 'src/services/common/LocalizationService'

export default function CustomDeleteDialog({
  title,
  confirmText,
  openDialog,
  onClose,
  onDelete
}: {
  title: string
  confirmText: string
  openDialog: boolean
  onClose: () => void
  onDelete: () => void
}) {
  return (
    <Dialog
      open={openDialog}
      onClose={onClose}
      maxWidth={'xs'}
      fullWidth
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle sx={{ py: 2 }} id='alert-dialog-title'>
        {title}
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id='alert-dialog-description'>{confirmText}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ py: 2 }}>
        <Button onClick={onClose} variant='contained' color='secondary'>
          {LocalizationService.translate('cm_cancel')}
        </Button>
        <Button
          variant='contained'
          endIcon={<IconifyIcon icon='ic:baseline-delete' />}
          onClick={() => {
            onDelete()
            onClose()
          }}
        >
          {LocalizationService.translate('cm_delete')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
