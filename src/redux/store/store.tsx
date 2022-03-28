import { configureStore } from "@reduxjs/toolkit"

import taskSliceReducer from "../slice/tasks/taskSlice"
import openSnackReducer from "../slice/snack/snackSlice"

const store = configureStore({
	reducer: {
		taskListState: taskSliceReducer,
		open: openSnackReducer,
	},
})

export default store
