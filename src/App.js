import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from "./components/MovieCard";
import './App.scss'

function App() {
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState('')

    const API_URL = 'https://api.themoviedb.org/3'

    const fetchMovies = async (searchKey) => {
        const type = searchKey ? 'search' : 'discover'
        const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_API_KEY,
                query: searchKey
            },
        }).catch(err => console.log(err))
        setMovies(results)
    }


    useEffect(() => {
        fetchMovies()
    }, [])

    const renderMovies = () => (
        movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))
    )

    const searchMovies = (event) => {
        event.preventDefault()
        fetchMovies(searchKey)
    }

    return (
        <div className='App'>
            <header>
                <div className="header-content centering">

                    <h1>Movie app</h1>

                    <form onSubmit={searchMovies}>
                        <input className='header-input' placeholder='Поиск...' type="text" onChange={(e) => setSearchKey(e.target.value)} />
                        <button className='header-btn' type='submit'>Search</button>
                    </form>
                </div>
            </header>

            <div className=" container centering">
                {renderMovies()}
            </div>
        </div>
    )
}

export default App;