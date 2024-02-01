import './MovieCard.scss'

const MovieCard = ({ movie }) => {
	const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500'

	return (
		<div className="movie-card">
			{movie.poster_path ? (
				<img
					className="movie-cover"
					src={`${IMAGE_PATH}${movie.poster_path}`}
					alt="movie_image"
				/>
			) : null}
			<h5 className="movie-title">{movie.title}</h5>
		</div>
	)
}

export default MovieCard
