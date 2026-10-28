import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../api/tmdb.js';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        setReviews(await getMovieReviews(movieId));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;
  if (reviews.length === 0)
    return <p>We don't have any reviews for this movie.</p>;

  return (
    <ul className={css.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.item}>
          <h4>Author: {author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
