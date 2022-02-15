import { createSlice } from "@reduxjs/toolkit"

interface ITascList {
	title: string
	tasks: {
		name: string
		status: boolean
	}[]
}

const initialState: ITascList[] = []

const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		updateTasks(state, action) {
			state.push(action.payload)
		},
	},
})

export const { updateTasks } = taskSlice.actions

export default taskSlice.reducer
