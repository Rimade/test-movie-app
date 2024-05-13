import React from 'react'
import Home from './pages/Home'
import { Route, Routes, Link } from 'react-router-dom'
import NotFound from './pages/NotFound'
import './App.scss'

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	)
}

export default App
