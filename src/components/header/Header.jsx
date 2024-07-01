import React, { useContext, useState,useEffect } from 'react'; // Добавлен useState
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeCurrentCategory } from '../../store/reducers/uiSlice';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite'; // Добавлен import observer
import './header.css';
import { useNavigate } from 'react-router-dom'; 
import {REGISTRATION_ROUTE, SHOP_ROUTE, LOGIN_ROUTE, ADMIN_ROUTE,BASKET_ROUTE} from '../../utils/consts';



const Header = observer(() => { // Обернуто в observer

  const navigate = useNavigate();
  const { user, product } = useContext(Context);
  const categories = useSelector(state => state.rootReducer.uiSlice.categories);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          user.setIsAuth(true);
          const storedUser = JSON.parse(localStorage.getItem('user'));
          if (storedUser) {
              user.setUser(storedUser);
          }
      }
  }, [user]);

  const handleLogout = () => {
      user.setIsAuth(false);
      user.setUser({});
      localStorage.removeItem('isAuth');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate(LOGIN_ROUTE);
  };

  const handleClick = (el) => {
      dispatch(changeCurrentCategory(el.id));
  };

  const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      product.setSearchQuery(event.target.value); // Обновляем состояние поиска в store
  };

  return (
      <header className="header">
          <div className="container_hed">
              <div className="header_row">
                  <div className="header_logo">
                      <Link to={SHOP_ROUTE} className="logo-link">
                          <span>StyleWave</span>
                      </Link>
                  </div>
                 
                  <div className="header_user">
                      <div className="input-wrapper">
                          <input 
                              className="input" 
                              type="text" 
                              placeholder="Поиск" 
                              value={searchQuery} 
                              onChange={handleSearchChange} 
                          />
                          <svg viewBox="0 0 24 24"></svg>
                      </div>
                      {!user.isAuth ? (
                          <div>
                              <button className="bt" onClick={() => navigate(REGISTRATION_ROUTE)}>Авторизация</button>
                          </div>
                      ) : (
                          <div>
                              {user.role === 'ADMIN' && (
                                  <button className="bt" onClick={() => navigate(ADMIN_ROUTE)}>Админ</button>
                              )}:
                              {user.role === 'USER' && (
                                  <button className="bt" onClick={() => navigate(BASKET_ROUTE)}>Корзина</button>
                              )}
                              
                              <button className="bt" onClick={handleLogout}>Выйти</button>
                              
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </header>
  );
});

  

export default Header;