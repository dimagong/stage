import * as React from "react"
import Alert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import AlertTitle from "@mui/material/AlertTitle"

interface IProps {
	fact: string
	onCloseAlert: Function
}

export default function AlertFact({ fact, onCloseAlert }: IProps) {
	return (
		<Stack sx={{ width: "100%", position: "absolute", maxWidth: "500px" }} spacing={2}>
			<Alert onClose={() => onCloseAlert()} severity='success'>
				<AlertTitle>Success</AlertTitle>
				{fact}
			</Alert>
		</Stack>
	)
}
