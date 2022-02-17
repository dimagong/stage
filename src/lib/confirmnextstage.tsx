//confirmation for start execute next stage/if the previous stage is successful

import { ITascStatus } from "../models/interfaces"

const confirmNextStage = (title: string, tascStatus: ITascStatus): boolean => {
	if (tascStatus) {
		const convertToArray: [string, boolean][] = Object.entries(tascStatus)
		const indexBatch: number = convertToArray.findIndex((el) => el[0] === title)
		if (indexBatch > 0) {
			return convertToArray[indexBatch - 1][1]
		}
		return true
	}
	return false
}

export default confirmNextStage
