import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import '../pages/pagesCSS/auth.css'
import { NavLink, useLocation, useNavigate  } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { registration, login } from '../components/http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';


const Auth = observer(() => {
    const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }

      user.setUser(data); // Сохраняем данные пользователя в UserStore
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!value) {
      setEmailError('');
    } else if (!isValidEmail) {
      setEmailError('Введите корректный email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailError && email) {
      click(); // Вызываем функцию click при успешной валидации
    } else {
      console.error('Invalid email:', email);
      document.getElementById('email').classList.add('error');
    }
  };

  return (
    <div className='auth-card'>
      <div className='auth-header'>
        <h2>{isLogin ? 'Авторизация' : "Регистрация"}</h2>
      </div>
      <div className='auth-body'>
        <div className='wrapper'>
          <input
            type='email'
            id='email'
            placeholder='Введите ваш email'
            value={email}
            onChange={handleEmailChange}
            className={emailError ? 'error' : ''}
          />
          {emailError && <span className='error-message'>{emailError}</span>}
        </div>
        <div className='wrapper password-wrapper'>
          <input
            type={passwordVisible ? 'text' : 'password'} 
            id='password'
            placeholder='Введите пароль'
            value={password}
            onChange={handlePasswordChange}
            className={passwordVisible ? '' : 'password-input'}
          />
          <button
            type='button'
            className='password-toggle-button'
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <i className='fa fa-eye-slash'></i>
            ) : (
              <i className='fa fa-eye'></i>
            )}
          </button>
        </div>
      </div>
      <div className='footer'>
        {isLogin ?
          <div className='register-section'>
            <span>Нет аккаунта? </span>
            <NavLink to={REGISTRATION_ROUTE} className='register-link'>
              Зарегистрируйся!
            </NavLink>
          </div>
          :
          <div>
            <div className='register-section'>
              <span>Есть аккаунт? </span>
              <NavLink to={LOGIN_ROUTE} className='register-link'>
                Войдите!
              </NavLink>
            </div>
          </div>
        }
        <button className='login-button' onClick={handleSubmit}>
          {isLogin ? 'Войти' : 'Регистрация'}
        </button>
      </div>
    </div>
  );
});

export default Auth;