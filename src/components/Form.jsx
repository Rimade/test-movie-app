import React from 'react'

const Form = ({ searchMovies, setSearchKey }) => {
	return (
		<>
			<form onSubmit={searchMovies}>
				<input
					className="header-input"
					placeholder="Поиск..."
					type="text"
					onChange={(e) => setSearchKey(e.target.value)}
				/>
				<button className="header-btn" type="submit">
					Search
				</button>
			</form>
		</>
	)
}

export default Form
