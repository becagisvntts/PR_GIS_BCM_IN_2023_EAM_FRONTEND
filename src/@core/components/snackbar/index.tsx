import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { hideMessage } from 'src/store/MenuSlice'
import { RootState } from 'src/store'

const SnackBar = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootState) => state.snackBar)
  const handleClose = () => {
    dispatch(hideMessage())
  }

  return (
    <Snackbar
      open={data.open}
      autoHideDuration={data.duration}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      <Alert onClose={handleClose} severity={data.severity} sx={{ width: '100%' }} elevation={20} variant='filled'>
        {data.message}
      </Alert>
    </Snackbar>
  )
}
export default SnackBar
