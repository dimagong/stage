import { createSlice } from "@reduxjs/toolkit"

interface ISnack {
	open: boolean
}

const initialState: ISnack = { open: true }

const snackSlice = createSlice({
	name: "snack",
	initialState,
	reducers: {
		openSnack(state, action) {
			return { open: action.payload }
		},
	},
})

export const { openSnack } = snackSlice.actions

export default snackSlice.reducer
