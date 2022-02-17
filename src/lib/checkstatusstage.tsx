//checking tasks of the stage and then change  stage status

import { ITascList, ITascStatus } from "../models/interfaces"

const checkStatusStage = (
	title: string,
	taskListState: ITascList[],
	tascStatus: ITascStatus
): ITascStatus | null => {
	const batchTasks = taskListState.find((el) => el.title === title)
	if (batchTasks) {
		const unfulfilled = batchTasks.tasks.filter((task) => task.status === false)
		const confirm = { [title]: false }
		if (!unfulfilled.length) {
			confirm[title] = true
		}
		return { ...tascStatus, ...confirm }
	}
	return null
}

export default checkStatusStage
