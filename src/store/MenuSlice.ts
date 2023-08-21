import { AlertColor } from '@mui/material'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import MenuService from 'src/services/MenuService'

interface SnackBar {
  menu: Object
  loading: boolean
}

const initialState: SnackBar = { menu: {}, loading: false }

const fetchMenu = createAsyncThunk('menu/fetch', async () => {
  return await MenuService.fetchMenu()
})

const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMenu.pending, state => {
        state.loading = true
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false
        state.menu = action.payload
      })
  }
})
export { fetchMenu }
const menuReducer = MenuSlice.reducer
export default menuReducer
