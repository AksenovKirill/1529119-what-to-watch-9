import {useRef, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../types/server';
import {AppRoute} from '../../const';

function SingInScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const hadleBlurEmail = (name: string) => {
    setIsValidEmail(!!name);
  };
  const handlePasswordFocus = (name: string) => {
    setIsValidPassword(!!name);
  };
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
              {!isValidEmail && <span style={{fontSize: '30px'}}> Введите корректный email</span> }
              <input
                onFocus={(event) => hadleBlurEmail(event.target.value)}
                className='sign-in__input'
                ref={loginRef}
                type='email'
                placeholder='Email address'
                name='user-email'
                id='user-email'
              />
              <label
                className='sign-in__label visually-hidden'
                htmlFor='user-email'
              >
                Email address
              </label>
            </div>
            <div className='sign-in__field'>
              {!isValidPassword && <span style={{fontSize: '30px'}}> Пароль должен содержать <br/> минимум 1 цифру и 1 букву </span> }
              <input
                className='sign-in__input'
                onFocus={(event) => handlePasswordFocus(event.target.value)}
                ref={passwordRef}
                type='password'
                placeholder='Password'
                name='user-password'
                id='user-password'
                pattern='(?=.*\d)(?=.*[a-z]).{1,}'
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
