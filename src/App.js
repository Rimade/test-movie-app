import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from "./components/MovieCard";

function App() {
    const [movies, setMovies] = useState([])

    const API_URL = 'https://api.themoviedb.org/3'

    const getMovies = async () => {
        const { data: { results } } = await axios.get(`${API_URL}/discover/movie`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_API_KEY,
            },
        })
        setMovies(results)
    }


    useEffect(() => {
        getMovies()
    }, [])

    const renderMovies = () => (
        movies.map((movie) => (
            <MovieCard key={movie.ud} movie={movie} />
        ))
    )

    return (
        <div>
            <h1 className='h-8'>Hello world</h1>
            <div className="container">
                {renderMovies()}
            </div>
        </div>
    )
}

export default App;