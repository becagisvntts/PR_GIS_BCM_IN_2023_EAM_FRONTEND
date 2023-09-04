import { Box, Button } from '@mui/material'
import { AnyAction } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import StateHelper from 'src/services/StateHelper'
import { toastSuccess } from 'src/services/common/NotifyService'
import ClassService from 'src/services/eam/ClassService'
import store, { RootState, useAppDispatch, useAppSelector } from 'src/store'
import { fetchClasses } from 'src/store/ClassSlice'
import Loading from 'src/views/components/common/Loading'

const getSection = (path: string) => {
  const pathArr = path.split('#')
  return pathArr[pathArr.length - 1]
}

const Home = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const sectionId = getSection(router.asPath)
  ///List config of class

  const [objectType, setObjectType] = useState('')
  const [objectTypeName, setObjectTypeName] = useState('')
  const [objectActive, setObjectActive] = useState({})

  useEffect(() => {
    dispatch(fetchClasses())
  }, [])

  useEffect(() => {
    // dispatch(fetchClassDetail())
    console.log(sectionId)
  }, [sectionId])

  const getClassTypeFromSessionId = (sessionId: string) => {
    const sessionIdArr = sessionId.split('/')

  }

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

export async function getServerSideProps(context: any) {
  return {
    props: {}
  }
}
