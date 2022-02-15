import { configureStore } from "@reduxjs/toolkit"

import taskSliceReducer from "../features/tasks/taskSlice"

export default configureStore({
	reducer: {
		taskListState: taskSliceReducer,
	},
})
