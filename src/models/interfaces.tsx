export interface ITascStatus {
	[key: string]: boolean
}
export interface IReasponse {
	title: string
	tasks: string[]
}
export interface ITascList {
	title: string
	tasks: {
		name: string
		status: boolean
	}[]
}
