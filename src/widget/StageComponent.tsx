import { Box, Checkbox, Paper, Typography } from "@mui/material"
import React, { useEffect } from "react"
import "./StageComponent.scss"
import { nanoid } from "nanoid"

export interface IProps {
	title: string
	tasks: {
		name: string
		status: boolean
	}[]
	updateTaskList: Function
	isCheckPreviousTask: boolean
}
export interface IState {
	[key: string]: boolean
}
// interface ITascStatus {
// 	[key: string]: boolean
// }

const StageComponent = ({ title, tasks, updateTaskList, isCheckPreviousTask }: IProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name
		//setChecked({ ...checked, [name]: event.target.checked })
		const findCheckTask = tasks.find((el) => el.name === name)
		if (findCheckTask && isCheckPreviousTask) {
			findCheckTask.status = !findCheckTask.status
			updateTaskList(title, tasks)
		}
	}

	return (
		<Paper elevation={2} className='stageItem'>
			<Typography className='title'>{title}</Typography>
			{tasks?.map((el, idx) => {
				return (
					<Box key={nanoid()} className='item'>
						<Checkbox name={el.name} checked={el.status} onChange={handleChange} />
						<Typography className='subtitle'>{el.name}</Typography>
					</Box>
				)
			})}
		</Paper>
	)
}

export default StageComponent
