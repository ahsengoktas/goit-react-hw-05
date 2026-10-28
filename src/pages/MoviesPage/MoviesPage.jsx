import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList.jsx';
import { searchMovies } from '../../api/tmdb.js';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setMovies(await searchMovies(query));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.elements.query.value.trim();
    setSearchParams(value ? { query: value } : {});
    event.target.reset();
  };

  return (
    <main className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input className={css.input} type="text" name="query" />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading movies...</p>}
      {isError && <p>Something went wrong. Please try again later.</p>}
      {!isLoading && !isError && query && movies.length === 0 && (
        <p>No movies found for "{query}".</p>
      )}
      {query && movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default MoviesPage;
