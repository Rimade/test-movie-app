import React, { useEffect, useState } from 'react'
import axios from 'axios'
import YouTube from 'react-youtube'
import MovieCard from './../components/MovieCard'
import '../App.scss'
import Header from './../components/Header'
import Form from './../components/Form'
import player from '../assets/img/play.png'
import pause from '../assets/img/pause-button.png'

const Home = () => {
	const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'
	const API_URL = 'https://api.themoviedb.org/3'

	const [movies, setMovies] = useState([])
	const [searchKey, setSearchKey] = useState('')
	const [selectedMovie, setSelectedMovie] = useState({})
	const [playerTrailer, setPlayerTrailer] = useState(false)
	const [isVisible, setIsVisible] = useState(true)

	const fetchMovies = async (searchKey) => {
		const type = searchKey ? 'search' : 'discover'
		const {
			data: { results },
		} = await axios
			.get(`${API_URL}/${type}/movie`, {
				params: {
					api_key: process.env.REACT_APP_MOVIE_API_KEY,
					query: searchKey,
				},
			})
			.catch((err) => console.log(err))

		setMovies(results)
		await selectMovie(results[0])
	}

	const fetchMovie = async (id) => {
		const { data } = await axios.get(`${API_URL}/movie/${id}`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
				append_to_response: 'videos',
			},
		})

		return data
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	const selectMovie = async (movie) => {
		setPlayerTrailer(false)
		const data = await fetchMovie(movie.id)
		setSelectedMovie(data)
		window.scrollTo(0, 0)
	}

	const renderMovies = () =>
		movies.map((movie) => (
			<MovieCard key={movie.id} movie={movie} selectMovie={selectMovie} />
		))

	const searchMovies = (event) => {
		event.preventDefault()
		fetchMovies(searchKey)
	}

	const renderTrailer = () => {
		const trailer = selectedMovie.videos.results.find((video) => {
			return video.name === 'Official Trailer'
		})
		const key = trailer ? trailer.key : selectedMovie.videos.results[0].key
		return (
			<YouTube
				videoId={key}
				className={'youtube-container'}
				opts={{
					width: '100%',
					height: '100%',
					playerVars: {
						autoplay: 1,
						disablekb: 1,
						controls: 1,
						color: 'red',
					},
				}}
			/>
		)
	}

	return (
		<>
			<header>
				<div className="header-content centering">
					<Header />

					<Form setSearchKey={setSearchKey} searchMovies={searchMovies} />
				</div>
			</header>
			<div
				className="hero"
				style={{
					backgroundImage: `url('${IMAGE_PATH}${selectedMovie.backdrop_path}')`,
				}}
			>
				<div className="">
					{playerTrailer && (
						<button
							className={'hero-btn hero-btn-play centering'}
							onClick={() => {
								setPlayerTrailer(false)
								setIsVisible(!isVisible)
							}}
						>
							<img
								className={isVisible ? ' none' : ''}
								src={pause}
								alt="pause"
								width={50}
								height={50}
							/>
						</button>
					)}

					{selectedMovie.videos && playerTrailer ? renderTrailer() : null}

					{!playerTrailer && (
						<h1 className="hero-title">{selectedMovie.title}</h1>
					)}
					<button
						className={'hero-btn hero-btn-play centering'}
						onClick={() => {
							setPlayerTrailer(true)
							setIsVisible(!isVisible)
						}}
					>
						<img
							className={isVisible ? '' : ' none'}
							src={player}
							alt="Play trayler"
							width={40}
							height={40}
						/>
					</button>

					{selectedMovie.overview ? (
						<p className="hero-overview">{selectedMovie.overview}</p>
					) : null}
				</div>
			</div>

			<div className=" container centering">{renderMovies()}</div>
		</>
	)
}

export default Home
