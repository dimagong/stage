import { Box } from "@mui/material"
import React from "react"

import "./App.scss"
import AppBarView from "./view/AppBarView"
import FooterBarView from "./view/FooterBarView"
import MainBarView from "./view/MainBarView"

function App() {
	return (
		<div className='app'>
			<Box className='header'>
				<AppBarView />
			</Box>
			<Box className='main'>
				<MainBarView />
			</Box>
			<Box className='footer'>
				<FooterBarView />
			</Box>
		</div>
	)
}

export default App
