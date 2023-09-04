import { Typography } from '@mui/material'
import CardGetter from 'src/services/eam/CardGetter'
import DataList from 'src/services/models/DataList'

interface Props {
  cards: DataList
  classConfig: any
  attributes: DataList
}
import * as React from 'react'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconifyIcon from 'src/@core/components/icon'

interface Props {
  cards: DataList
  classConfig: any
  attributes: DataList
}

const CardGrid = (props: Props) => {
  const Row = ({ card }: { card: any }) => {
    console.log(card)
    const [open, setOpen] = React.useState(false)

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
              <IconifyIcon icon={open ? 'iconamoon:arrow-down-2-duotone' : 'iconamoon:arrow-right-2-duotone'} />
            </IconButton>
          </TableCell>
          <TableCell component='th' scope='row'>
            {CardGetter.getDescription(card)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  Detail
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align='right'>Amount</TableCell>
                      <TableCell align='right'>Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align='right'>Calories</TableCell>
            <TableCell align='right'>Fat&nbsp;(g)</TableCell>
            <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
            <TableCell align='right'>Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.cards.data.map(card => (
            <Row key={CardGetter.getID(card)} card={card} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default CardGrid
