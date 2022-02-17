import { ITascStatus } from "../models/interfaces"

const findFalseStage = (tascStatus: ITascStatus | null): boolean => {
	if (tascStatus) {
		const convertToArray: [string, boolean][] = Object.entries(tascStatus)
		const findNoExtcution = convertToArray.find((el) => el[1] === false)
		if (findNoExtcution) {
			return true
		} else {
			return false
		}
	}
	return true
}

export default findFalseStage
