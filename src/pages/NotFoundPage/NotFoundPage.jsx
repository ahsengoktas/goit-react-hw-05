import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <main className={css.container}>
      <h1>Page not found</h1>
      <Link to="/">Go to the home page</Link>
    </main>
  );
};

export default NotFoundPage;
