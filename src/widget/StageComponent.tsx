import { Box, Checkbox, Paper, Typography } from "@mui/material"
import React, { useEffect } from "react"
import "./StageComponent.scss"
import { nanoid } from "nanoid"
import { ITascStatus } from "../models/interfaces"
import confirmNextStage from "../lib/confirmnextstage"
import CheckIcon from "@mui/icons-material/Check"
import { useDispatch } from "react-redux"
import { openSnack } from "../features/snack/snackSlice"

export interface IProps {
	title: string
	tasks: {
		name: string
		status: boolean
	}[]
	updateTaskList: Function
	tascStatus: ITascStatus | null
}

const StageComponent = ({ title, tasks, updateTaskList, tascStatus }: IProps) => {
	const dispatch = useDispatch()
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name
		const findCheckTask = tasks.find((el) => el.name === name)
		const confirmNextStep: boolean = tascStatus ? confirmNextStage(title, tascStatus) : false

		if (findCheckTask && confirmNextStep) {
			const upTasks = tasks.map((el) => {
				if (el.name === name) {
					return { ...el, status: !el.status }
				}
				return el
			})
			updateTaskList(title, upTasks)
		} else {
			dispatch(openSnack(true))
		}
	}

	return (
		<Paper elevation={2} className='stageItem'>
			<Box className='header'>
				<Typography className='title'>{title}</Typography>
				{tascStatus && tascStatus[title] ? <CheckIcon className='icon' color='primary' /> : null}
			</Box>

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
