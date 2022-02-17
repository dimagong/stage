import * as React from "react"
import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux"
import { openSnack } from "../features/snack/snackSlice"

interface IOpenSnackBar {
	open: boolean
}

export default function WarningSnackbar() {
	const openSnackBar: IOpenSnackBar = useSelector((state: RootStateOrAny) => state.open)
	const dispatch = useDispatch()

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return
		}
		dispatch(openSnack(false))
	}

	const action = (
		<React.Fragment>
			<Button color='secondary' size='small' onClick={handleClose}>
				OKAY
			</Button>
			<IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	)
	console.log("openSnackBar", openSnackBar)
	return (
		<div>
			<Snackbar
				open={openSnackBar.open}
				autoHideDuration={6000}
				onClose={handleClose}
				message='Please, execute previous tasks firstly!'
				action={action}
			/>
		</div>
	)
}
