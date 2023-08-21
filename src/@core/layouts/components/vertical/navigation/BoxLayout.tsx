import { Box } from '@mui/material'

export const BoxLayout = () => {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: theme => theme.palette.transparent.secondary,
          opacity: 1,
          borderRadius: '50%',
          width: '150px',
          height: '100px',
          left: '-50px',
          top: '-20px',
          transform: 'rotate(-45deg)'
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: theme => theme.palette.transparent.secondary,
          opacity: 1,
          borderRadius: '50%',
          width: '120px',
          height: '120px',
          left: '-30px',
          top: '45%'
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: theme => theme.palette.transparent.secondary,
          opacity: 1,
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          right: '60%',
          top: '60%'
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: theme => theme.palette.transparent.secondary,
          opacity: 1,
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          left: '-10px',
          top: '80%',
          transform: 'rotate(-45deg)'
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: theme => theme.palette.transparent.secondary,
          opacity: 1,
          borderRadius: '50%',
          width: '250px',
          height: '180px',
          right: '-150px',
          top: '20%',
          transform: 'rotate(-60deg)'
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          backgroundColor: theme => theme.palette.transparent.secondary,
          opacity: 1,
          borderRadius: '100% 0 0 0',
          width: '150px',
          height: '300px',
          right: 0,
          bottom: 0
        }}
      ></Box>
    </>
  )
}
