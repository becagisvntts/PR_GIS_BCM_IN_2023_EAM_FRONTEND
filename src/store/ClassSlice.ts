import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ClassService from 'src/services/eam/ClassService'
import DataList from 'src/services/models/DataList'
import RequestPayload from 'src/services/models/RequestPayload'

RequestPayload
interface ClassState {
  classes: DataList
  activeClass: any
  classAttributes: DataList
  classCards: DataList
  classDomains: DataList
  domainsAttributes: DataList[]
  cardDetail: any
  loading: boolean
  loadingDomains: boolean
  loadingAttributes: boolean
  requestPayload: RequestPayload
}

const initialState: ClassState = {
  classes: new DataList({}),
  activeClass: {},
  classAttributes: new DataList({}),
  classCards: new DataList({}),
  classDomains: new DataList({}),
  domainsAttributes: [],
  cardDetail: {},
  loading: false,
  loadingDomains: false,
  loadingAttributes: false,
  requestPayload: new RequestPayload({})
}

const fetchClasses = createAsyncThunk('classes/fetch', async () => {
  return await ClassService.fetchClasses()
})

// const fetchClassCards = createAsyncThunk(
//   'class-cards/fetch',
//   async ({ classType, requestPayload }: { classType: string; requestPayload: RequestPayload }) => {
//     return await ClassService.fetchClassCards(classType, requestPayload)
//   }
// )

const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    updateClasses: (state, action) => {
      state.classes = action.payload
    },
    updateActiveClass: (state, action) => {
      state.activeClass = action.payload
    },
    updateClassCards: (state, action) => {
      state.classCards = action.payload
    },
    updateRequestPayload: (state, action) => {
      state.requestPayload = action.payload
    }
    // changeActiveItem: (state, action) => {
    //   state.activeItem = action.payload
    // }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchClasses.pending, state => {
        state.loading = true
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false
        state.classes = action.payload
      })
  }
})
// export { fetchMenu }
export const { updateClasses, updateActiveClass, updateClassCards, updateRequestPayload } = classSlice.actions
export { fetchClasses }
const classReducer = classSlice.reducer
export default classReducer
