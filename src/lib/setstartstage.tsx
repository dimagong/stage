import { ITascStatus } from "../models/interfaces"

const setStartStage = (fetchdata: any[]): ITascStatus => {
	const startState: ITascStatus = {}
	fetchdata.forEach((element) => {
		startState[element.title] = false
	})
	return startState
}

export default setStartStage
