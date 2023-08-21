import { Box, Button } from '@mui/material'
import { toast } from 'react-hot-toast'
import { toastError, toastSuccess } from 'src/services/common/NotifyService'

const Home = () => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(fetchProjects() as unknown as AnyAction)
  //   dispatch(fetchJoinedProjects() as unknown as AnyAction)
  //   dispatch(fetchProjectSummary() as unknown as AnyAction)
  // }, [])

  return (
    <Box>
      <Button
        variant='contained'
        onClick={() => {
          toastSuccess('Welcome to BecaMaint')
        }}
      >
        Touch me!
      </Button>
    </Box>
  )
}

export default Home
