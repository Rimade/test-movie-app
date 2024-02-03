import './MovieCard.scss'

const MovieCard = ({ movie, selectMovie }) => {
	const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'

	return (
		<div className="movie-card" onClick={() => selectMovie(movie)}>
			{movie.poster_path ? (
				<img
					style={{ cursor: 'pointer' }}
					className="movie-cover"
					src={`${IMAGE_PATH}${movie.poster_path}`}
					alt="movie_image"
				/>
			) : (
				<div className="movie-placeholder">No image found</div>
			)}
			<h5 className="movie-title">{movie.title}</h5>
		</div>
	)
}

export default MovieCard
