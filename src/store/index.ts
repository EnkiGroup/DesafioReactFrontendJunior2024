import { configureStore } from '@reduxjs/toolkit'

import statesReducers from './reducer/reducerStates'

export const store = configureStore({
  reducer: {
    reducers: statesReducers
  }
})

export type RootReducer = ReturnType<typeof store.getState>
