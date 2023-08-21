import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface UserState {
  userData: any[]
  sessionId: string
}

const initialState = {
  userData: [],
  sessionId: ''
} as UserState

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.userData = action.payload.userData
      state.sessionId = action.payload.sessionId
    }
  }
})

export const { updateUserData } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer
