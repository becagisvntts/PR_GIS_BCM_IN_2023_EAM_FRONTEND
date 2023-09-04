import { AlertColor } from '@mui/material'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MenuState {
  menu: []
  activeItem: string
  loading: boolean
}

const initialState: MenuState = { menu: [], loading: false, activeItem: 'dashboard' }

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    updateMenu: (state, action) => {
      state.menu = action.payload
    },
    changeActiveItem: (state, action) => {
      state.activeItem = action.payload
    }
  }
})
export const { changeActiveItem, updateMenu } = menuSlice.actions
const menuReducer = menuSlice.reducer
export default menuReducer
