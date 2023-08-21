import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material'
import { IOption } from '../FormBuilderService'
import { useState } from 'react'
import IconifyIcon from 'src/@core/components/icon'
import { useTranslation } from 'react-i18next'
import LocalizationService from 'src/services/common/LocalizationService'

export default function ModifyOptionDialog({
  openDialog,
  onClose,
  onSaveOption,
  option,
  isCreate
}: {
  openDialog: boolean
  onClose: () => void
  onSaveOption: Function
  option: IOption
  isCreate: boolean
}) {
  const [modifyOption, setModifyOption] = useState(option)
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
        {`${LocalizationService.translate(isCreate ? 'cm_add' : 'cm_update')} ${LocalizationService.translate(
          'form_option'
        )}`}
      </DialogTitle>
      <DialogContent dividers={true}>
        <FormControl fullWidth>
          <TextField
            autoFocus
            id='name'
            label={LocalizationService.translate('form_option')}
            onChange={e => setModifyOption(prev => ({ ...prev, label: e.target.value }))}
            defaultValue={option.label}
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ py: 2 }}>
        <Button onClick={onClose} variant='contained' color='secondary'>
          {LocalizationService.translate('cm_cancel')}
        </Button>
        <Button
          variant='contained'
          endIcon={<IconifyIcon icon='ic:round-check' />}
          onClick={() => {
            onSaveOption(modifyOption)
            onClose()
          }}
        >
          {LocalizationService.translate(isCreate ? 'cm_add' : 'cm_update')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
