import { Typography } from "@mui/material"
import * as React from "react"
import StageComponent from "../widget/StageComponent"
import "./MainBarView.scss"
import { nanoid } from "nanoid"
import { useState } from "react"

import { RootStateOrAny, useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updateTasks } from "../features/tasks/taskSlice"
import fetchdata from "../api/fetchdata"
import setStartStage from "../lib/setstartstage"
import setStartTascks from "../lib/setstarttasks"
import { ITascList, ITascStatus } from "../models/interfaces"
import checkStatusStage from "../lib/checkstatusstage"
import useless from "../api/useless"
import findFalseStage from "../lib/findfalsestage"
import AlertFact from "../widget/AlertFact"

const MainBarView = () => {
	const taskListStore: ITascList[] = useSelector((state: RootStateOrAny) => state.taskListState)
	const dispatch = useDispatch()

	const [tascStatus, updateTascStatus] = useState<ITascStatus | null>(null)

	const [factState, onFactState] = useState("")

	React.useEffect(() => {
		console.log("React.useEffect")

		const initialUpdate = () => {
			//getting data from some rest api
			const dataApi = [...fetchdata]

			//saving start data to state/ Foundation: false ...
			const startFalseStage = setStartStage(dataApi)
			updateTascStatus({ ...startFalseStage })

			// updating type of tasks / ITascList
			const taskList = setStartTascks(dataApi)
			console.log("taskList", taskList)

			//push to store
			dispatch(updateTasks([...taskList]))
		}
		initialUpdate()
	}, [dispatch])

	React.useEffect(() => {
		console.log("React.useEffect tascStatus")
		if (tascStatus) {
			//checking tasks execution
			completeExecution(tascStatus)
			//saving progress to local storage
			window.localStorage.setItem("tascStatus", JSON.stringify(tascStatus))
		}
	}, [tascStatus])

	//updating after click to input field
	const updateTaskList = (
		title: string,
		tasks: {
			name: string
			status: boolean
		}[]
	) => {
		const upTaskListStore = taskListStore.map((el) => {
			if (el.title === title) {
				return { ...el, tasks }
			}
			return el
		})

		//push to store
		dispatch(updateTasks(upTaskListStore))

		//checking status of stage
		const checkStageStatus: ITascStatus | null = tascStatus
			? checkStatusStage(title, upTaskListStore, tascStatus)
			: null
		if (checkStageStatus) updateTascStatus({ ...checkStageStatus })
	}

	//checking complete execution all tasks and running final request
	const completeExecution = (tascStatus: ITascStatus) => {
		const isFalseStatus = findFalseStage(tascStatus)

		if (!isFalseStatus) {
			useless()
				.then((resp) => {
					console.log("resp", resp)
					if (resp?.text) {
						onFactState(resp.text)
					} else {
						onFactState("Oh, the facts are over")
					}
				})
				.catch((error) => {
					console.error("Error", error)
					onFactState("Something went wrong")
				})
				.finally(() => {
					console.log("Request has been done")
				})
		}
	}

	const onCloseAlert = () => {
		onFactState("")
	}

	console.log("taskListStore", taskListStore)
	const listTasks = [...taskListStore]
	return (
		<div className='mainbar'>
			<Typography className='mainbar-title'>My startup progress</Typography>
			{listTasks.length
				? listTasks.map((el) => {
						return (
							<StageComponent
								title={el.title}
								tasks={el.tasks}
								updateTaskList={updateTaskList}
								tascStatus={{ ...tascStatus }}
								key={nanoid()}
							/>
						)
				  })
				: ""}
			{factState ? <AlertFact fact={factState} onCloseAlert={onCloseAlert} /> : null}
		</div>
	)
}

export default MainBarView
