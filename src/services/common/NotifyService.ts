import { toast } from 'react-hot-toast'

const successStyle = {
  style: {
    background: '#28C76F',
    padding: '8px 16px',
    color: '#FFFFFF'
  },
  iconTheme: {
    primary: '#FFFFFF',
    secondary: '#28C76F'
  }
}

const errorStyle = {
  style: {
    background: '#EA5455',
    padding: '8px 16px',
    color: '#FFFFFF'
  },
  iconTheme: {
    primary: '#FFFFFF',
    secondary: '#EA5455'
  }
}

const toastSuccess = (message: string) => {
  toast.success(message, successStyle)
}

const toastError = (message: string) => {
  toast.error(message, errorStyle)
}

export { toastSuccess, toastError }
