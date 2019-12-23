export class User {
  id: string;
  email: string;
  password: string;
  username: string;
  confirmed: boolean;
  forgotPasswordLock: boolean;

  constructor(
    id: string,
    email: string,
    password: string,
    username: string,
    confirmed: boolean,
    forgotPasswordLock: boolean
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.confirmed = confirmed;
    this.forgotPasswordLock = forgotPasswordLock;
  }
}
