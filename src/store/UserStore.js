import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = JSON.parse(localStorage.getItem('isAuth')) || false;
    this._user = JSON.parse(localStorage.getItem('user')) || {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
    if (!bool) {
      localStorage.removeItem('token'); // Удаляем токен при выходе
    } else {
      localStorage.setItem('isAuth', JSON.stringify(bool));
    }
  }

  setUser(user) {
    this._user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get role() {
    return this._user.role || 'USER';
  }
  checkAuth() {
    return this._isAuth && this._user.id;
  }

}