import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UploadCheckResponse } from '@/types/type'

interface ChequeState {
	uploadedCheques: UploadCheckResponse['data'][]
	currentCheque: UploadCheckResponse['data'] | null
	isSheetOpen: boolean
}

const initialState: ChequeState = {
	uploadedCheques: [],
	currentCheque: null,
	isSheetOpen: false,
}

const chequeSlice = createSlice({
	name: 'cheque',
	initialState,
	reducers: {
		addUploadedCheque: (
			state,
			action: PayloadAction<UploadCheckResponse['data']>
		) => {
			state.uploadedCheques.unshift(action.payload)
			state.currentCheque = action.payload
		},
		setCurrentCheque: (
			state,
			action: PayloadAction<UploadCheckResponse['data'] | null>
		) => {
			state.currentCheque = action.payload
		},
		openSheet: state => {
			state.isSheetOpen = true
		},
		closeSheet: state => {
			state.isSheetOpen = false
		},
		clearCurrentCheque: state => {
			state.currentCheque = null
		},
	},
})

export const {
	addUploadedCheque,
	setCurrentCheque,
	openSheet,
	closeSheet,
	clearCurrentCheque,
} = chequeSlice.actions

export default chequeSlice.reducer
