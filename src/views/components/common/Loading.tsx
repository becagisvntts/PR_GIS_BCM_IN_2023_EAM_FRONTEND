import { CircularProgress, Grid } from '@mui/material'

export default function Loading({ height = 300 }) {
  return (
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: { height } }}>
      <CircularProgress />
    </Grid>
  )
}
