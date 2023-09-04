import store, { RootState, useAppDispatch } from 'src/store'
import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

export default class StateHelper {
  static appStore = () => store
  static classState = () => {
    return store.getState().class
  }
}
