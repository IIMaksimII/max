import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import BasketStore from './store/BasketStore';
import './'

export const Context = createContext(null);

console.log(process.env.REACT_APP_API_URL); 
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Context.Provider value={{
      user: new UserStore(),
      product: new ProductStore(),
      basket: new BasketStore()
    }}>
      <App />
    </Context.Provider>
  </Provider>
);