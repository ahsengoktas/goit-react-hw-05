import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { getTrendingMovies } from '../../api/tmdb.js';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setMovies(await getTrendingMovies());
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>Something went wrong. Please try again later.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default HomePage;
