import { IReasponse, ITascList } from "../models/interfaces"

// updating type of tasks / ITascList
const setStartTascks = (fetchData: IReasponse[]): ITascList[] => {
	const taskList: ITascList[] = fetchData.map((el) => {
		let items = el.tasks.map((task) => {
			return { name: task, status: false }
		})
		return { title: el.title, tasks: items }
	})

	return taskList
}

export default setStartTascks
