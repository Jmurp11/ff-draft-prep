export class User {
  id: string;
  email: string;
  username: string;
  private _token: string;
  private _tokenExpiration: Date;

  constructor(
    id: string,
    email: string,
    username: string,
    _token: string,
    _tokenExpiration: Date
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this._token = _token;
    this._tokenExpiration = _tokenExpiration;
  }

  get token() {
    if (!this._tokenExpiration || new Date() > this._tokenExpiration) {
      return null;
    }

    return this._token;
  }
}
