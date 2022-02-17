import { configureStore } from "@reduxjs/toolkit"

import taskSliceReducer from "../features/tasks/taskSlice"
import openSnackReducer from "../features/snack/snackSlice"

const store = configureStore({
	reducer: {
		taskListState: taskSliceReducer,
		open: openSnackReducer,
	},
})

export default store
