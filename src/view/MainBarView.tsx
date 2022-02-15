import { Typography } from "@mui/material"
import * as React from "react"
import StageComponent from "../widget/StageComponent"
import "./MainBarView.scss"
import { nanoid } from "nanoid"
import { useState } from "react"
import axios from "axios"
import { RootStateOrAny, useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updateTasks } from "../features/tasks/taskSlice"

interface ITascStatus {
	[key: string]: boolean
}
interface IReasponse {
	title: string
	tasks: string[]
}
interface ITascList {
	title: string
	tasks: {
		name: string
		status: boolean
	}[]
}

const MainBarView = () => {
	const taskListStore = useSelector((state: RootStateOrAny) => state.taskListState)
	const dispatch = useDispatch()

	console.log("taskListStore", taskListStore)

	const [tascStatus, updateTascStatus] = useState<ITascStatus | null>(null)
	const [taskListState, updateTaskListState] = useState<ITascList[]>([])
	const [imageData, saveImageData] = useState("")

	React.useEffect(() => {
		console.log("React.useEffect")
		//getting data from some rest api
		const dataApi = [
			{
				title: "Foundation",
				tasks: [
					"Setup virtual office",
					"Set mission and vision",
					"Select business name",
					"Buy domains",
				],
			},
			{ title: "Discovery", tasks: ["Create roadmap", "Competitor analysis"] },

			{ title: "Delivery Next", tasks: ["Release marketing website", "Release MVP"] },
		]
		//saving start data to store/ Foundation: false ...
		const startState: ITascStatus = {}
		dataApi.forEach((element) => {
			startState[element.title] = false
		})
		updateTascStatus({ ...startState })

		// updating type of tasks / ITascList
		const taskList = dataApi.map((el) => {
			let items = el.tasks.map((task) => {
				return { name: task, status: false }
			})
			return { title: el.title, tasks: items }
		})
		//saving response from request to store
		updateTaskListState([...taskList])
		//redux
		//dispatch(updateTasks([...taskList]))
	}, [])

	React.useEffect(() => {
		completeExecution()
		if (tascStatus) {
			window.sessionStorage.setItem("tascStatus", JSON.stringify(tascStatus))
		}
		if (taskListState) {
			window.sessionStorage.setItem("taskListState", JSON.stringify(taskListState))
		}
	})

	//updating after click to input field
	const updateTaskList = (
		title: string,
		tasks: {
			name: string
			status: boolean
		}[]
	) => {
		const upList = [...taskListState]
		const findElem: ITascList | undefined = upList.find((el) => el.title === title)

		if (findElem) {
			findElem.tasks = [...tasks]
			updateTaskListState([...upList])
			//redux
			//dispatch(updateTasks([...upList]))
			checkTaskStatus(title)
		}
	}

	//change status of tasks group
	const checkTaskStatus = (title: string): void => {
		const batchTasks = taskListState.find((el) => el.title === title)
		if (batchTasks) {
			const unfulfilled = batchTasks.tasks.filter((task) => task.status === false)
			const confirm = { [title]: false }
			if (!unfulfilled.length) {
				confirm[title] = true
			}
			updateTascStatus({ ...tascStatus, ...confirm })
		}
	}

	//checking fulfilling previous task
	const checkPreviousTask = (title: string): boolean => {
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

	//checking complete execution all tasks and redirection to next page
	const completeExecution = async () => {
		if (tascStatus) {
			const convertToArray: [string, boolean][] = Object.entries(tascStatus)
			const findNoExtcution = convertToArray.find((el) => el[1] === false)
			console.log("findNoExtcution", findNoExtcution)
			if (!findNoExtcution) {
				const resp = await axios.get("https://uselessfacts.jsph.pl/random.json")
				saveImageData(resp.data.source_url)
				if (resp.data.source_url) {
					window.location.href = resp.data.source_url
				}
			}
		}
	}

	return (
		<div className='mainbar'>
			<Typography className='mainbar-title'>My startup progress</Typography>
			{taskListState.length
				? taskListState.map((el) => {
						return (
							<StageComponent
								{...el}
								updateTaskList={updateTaskList}
								isCheckPreviousTask={checkPreviousTask(el.title)}
								key={nanoid()}
							/>
						)
				  })
				: ""}
		</div>
	)
}

export default MainBarView
