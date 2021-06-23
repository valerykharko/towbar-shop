import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = true;
    this._isAdmin = false;
    this._users = {};
    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setIsAdmin(bool) {
    this._isAdmin = bool;
  }

  setUser(user) {
    this._users = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get isAdmin() {
    return this._isAdmin;
  }

  get users() {
    return this._users;
  }
}
