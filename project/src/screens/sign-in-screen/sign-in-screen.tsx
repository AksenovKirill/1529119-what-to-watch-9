import {useRef, FormEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/server';
import {AppRoute} from '../../const';
import { addErrorMessage, checkValidateEmail, checkValidatePassword } from '../../utils';

function SingInScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      });
      navigate(AppRoute.Main);
    }
  };

  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <Logo/>
        <h1 className='page-title user-page__title'>Sign in</h1>
      </header>
      <div className='sign-in user-page__content'>
        <form action='#' className='sign-in__form' onSubmit={handleSubmit}>
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input
                className='sign-in__input'
                ref={loginRef}
                type='email'
                placeholder='Email address'
                name='user-email'
                id='user-email'
                onChange={(evt) =>
                  addErrorMessage(
                    evt.target,
                    checkValidateEmail(evt.target.value),
                  )}
                required
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-email'
              >
                Email address
              </label>
            </div>
            <div className='sign-in__field'>
              <input
                className='sign-in__input'
                ref={passwordRef}
                type='password'
                placeholder='Password'
                name='user-password'
                id='user-password'
                minLength={2}
                onChange={(evt) =>
                  addErrorMessage(
                    evt.target,
                    checkValidatePassword(evt.target.value),
                  )}
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-password'
              >
                Password
              </label>
            </div>
          </div>
          <div className='sign-in__submit'>
            <button
              className='sign-in__btn'
              type='submit'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SingInScreen;
