import { Link, useParams } from 'react-router-dom';
import { Film } from '../../types/film';
import { Comment } from '../../types/comment';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import Login from '../../components/login/login';
import Logo from '../../components/logo/logo';
import Tabs from '../../components/tabs/tabs';

type Props = {
  films: Film[];
  comments: Comment[];
}

function MovieScreen({films, comments}: Props): JSX.Element{
  const params = useParams<string>();

  const paramsId = Number(params.id);

  const film: Film = films.filter((currentFilm) => currentFilm.id === paramsId)[0];
  const commentsCurrentFilm: Comment[] = comments.filter((currentComments) => currentComments.id === paramsId);

  const {name, id, posterImage, genre, released, backgroundImage} = film;

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <Login/>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <Link to="/player/:id">
                  <button className="btn btn--play film-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                </Link>
                <Link to="/mylist">
                  <button className="btn btn--list film-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                </Link>
                <Link to="/film/:id/review"className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs film={film} comments={commentsCurrentFilm}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmList films={films} genre={genre} id={id}/>
        </section>
        <Footer/>
      </div>
    </>
  );
}

export default MovieScreen;
