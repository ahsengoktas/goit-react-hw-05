import { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieDetails, IMAGE_BASE_URL } from '../../api/tmdb.js';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setMovie(await getMovieDetails(movieId));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <main className={css.container}>
      {/* eslint-disable-next-line react-hooks/refs -- ref pattern required by the assignment */}
      <Link to={backLinkRef.current}>Go back</Link>
      {isLoading && <p>Loading movie...</p>}
      {isError && <p>Something went wrong. Please try again later.</p>}
      {movie && (
        <>
          <div className={css.details}>
            {movie.poster_path && (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                width="250"
              />
            )}
            <div>
              <h1 className={css.title}>{movie.title}</h1>
              <p>User score: {Math.round(movie.vote_average * 10)}%</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <p>{movie.genres.map(({ name }) => name).join(', ')}</p>
            </div>
          </div>
          <hr />
          <h3>Additional information</h3>
          <ul>
            <li>
              <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
              <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
          <hr />
          <Outlet />
        </>
      )}
    </main>
  );
};

export default MovieDetailsPage;
