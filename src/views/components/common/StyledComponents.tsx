import { TableCell, TableRow, Typography, styled } from '@mui/material'
import Link from 'next/link'
import Translations from 'src/layouts/components/Translations'
import LocalizationService from 'src/services/common/LocalizationService'

const LinkStyled = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none'
}))

const DTEmptyRows = ({ colSpan, message }: { colSpan: number; message?: string }) => {
  return (
    <TableRow sx={{ height: '75px' }}>
      <TableCell colSpan={colSpan} align='center'>
        <Typography fontWeight={500} fontSize={'1rem'}>
          {LocalizationService.translate('msg_empty_data')}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
export { LinkStyled, DTEmptyRows }
