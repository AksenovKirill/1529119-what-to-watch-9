import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import MainScreen from '../../screens/main-screen/main-screen';
import SingInScreen from '../../screens/sign-in-screen/sign-in-screen';
import MyListScreen from '../../screens/my-list-screen/my-list-screen';
import FilmScreen from '../../screens/film-screen/film-screen';
import AddReviewScreen from '../../screens/add-review-screen/add-review-screen';
import PlayerScreen from '../../screens/player-screen/player-screen';
import PrivateRoute from '../private-route/private-route';
import NotFoundScreen from '../../screens/not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainScreen />} />
      <Route path={AppRoute.Login} element={<SingInScreen />} />
      <Route path={AppRoute.MyList} element={
        <PrivateRoute>
          <MyListScreen />
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Film} element={<FilmScreen />} />
      <Route path={AppRoute.AddReview} element={
        <PrivateRoute>
          <AddReviewScreen />
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Player} element={<PlayerScreen />} />
      <Route path='*' element={<NotFoundScreen />} />
    </Routes>
  );
}

export default App;
