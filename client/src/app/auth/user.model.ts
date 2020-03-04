export class User {
  id: string;
  email: string;
  username: string;
  private _token: string;

  constructor(
    id: string,
    email: string,
    username: string,
    _token: string,
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this._token = _token;
  }

  getToken() {
    if (!this._token) {
      return null;
    }

    return this._token;
  }
}
