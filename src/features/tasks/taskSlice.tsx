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
			return [...action.payload] as ITascList[]
		},
	},
})

export const { updateTasks } = taskSlice.actions

export default taskSlice.reducer
