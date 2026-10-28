import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast, IMAGE_BASE_URL } from '../../api/tmdb.js';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setCast(await getMovieCast(movieId));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) return <p>Loading cast...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;
  if (cast.length === 0)
    return <p>We don't have any cast info for this movie.</p>;

  return (
    <ul className={css.list}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={css.item}>
          {profile_path && (
            <img
              src={`${IMAGE_BASE_URL}${profile_path}`}
              alt={name}
              width="80"
            />
          )}
          <p>{name}</p>
          <p>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
