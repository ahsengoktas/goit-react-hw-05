import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.jsx';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(
  () => import('../../pages/MovieDetailsPage/MovieDetailsPage.jsx'),
);
const NotFoundPage = lazy(
  () => import('../../pages/NotFoundPage/NotFoundPage.jsx'),
);
const MovieCast = lazy(() => import('../MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews.jsx'));

const App = () => {
  return (
    <>
      <Navigation />
      <Suspense fallback={<p>Loading page...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
