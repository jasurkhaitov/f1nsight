import { configureStore } from '@reduxjs/toolkit'
import chequeReducer from './chequeSlice'

export const store = configureStore({
	reducer: {
		cheque: chequeReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
