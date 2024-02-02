import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from "./components/MovieCard";
import './App.scss'
import YouTube from 'react-youtube';

function App() {
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280'
    const API_URL = 'https://api.themoviedb.org/3'

    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState('')
    const [selectedMovie, setSelectedMovie] = useState({});
    const [playerTrailer, setPlayerTrailer] = useState(false);


    const fetchMovies = async (searchKey) => {
        const type = searchKey ? 'search' : 'discover'
        const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_API_KEY,
                query: searchKey
            },
        }).catch(err => console.log(err))

        setMovies(results)
        await selectMovie(results[0])
    }

    const fetchMovie = async (id) => {
        const { data } = await axios.get(`${API_URL}/movie/${id}`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_API_KEY,
                append_to_response: 'videos'
            }
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

    const renderMovies = () => (
        movies.map((movie) => (
            <MovieCard
                key={movie.id}
                movie={movie}
                selectMovie={selectMovie} />
        ))
    )

    const searchMovies = (event) => {
        event.preventDefault()
        fetchMovies(searchKey)
    }

    const renderTrailer = () => {
        const trailer = selectedMovie.videos.results.find((vid) => vid.name === 'Official Trailer')
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
                        color: 'red'
                    },
                }}
            />
        )
    }

    return (
        <div className='App'>
            <header>
                <div className="header-content centering">

                    <a className='header-link' href="/">KINOPOISK</a>

                    <form onSubmit={searchMovies}>
                        <input className='header-input' placeholder='Поиск...' type="text" onChange={(e) => setSearchKey(e.target.value)} />
                        <button className='header-btn' type='submit' >Search</button>
                    </form>
                </div>
            </header>

            <div className="hero" style={{ backgroundImage: `url('${IMAGE_PATH}${selectedMovie.backdrop_path}')` }}>
                <div className="hero-content centering ">
                    {playerTrailer && (
                        <button className='hero-btn hero-btn-close' onClick={() => setPlayerTrailer(false)}>Close</button>
                    )}



                    {selectedMovie.videos && playerTrailer ? renderTrailer() : null}

                    <h1 className='hero-title'>{selectedMovie.title}</h1>
                    <button className='hero-btn' onClick={() => setPlayerTrailer(true)}>Play trailer</button>

                    {selectedMovie.overview ? <p className='hero-overview'>{selectedMovie.overview}</p> : null}
                </div>
            </div>

            <div className=" container centering">
                {renderMovies()}
            </div>
        </div>
    )
}

export default App;