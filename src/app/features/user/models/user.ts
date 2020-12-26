export class User {
  constructor(user: object) {
    this.email = user['email'];
    this.password = user.hasOwnProperty('password') ? user['password']:null;
    this.id = user.hasOwnProperty('uid') ? user['uid']:null;
    this.token = user.hasOwnProperty('refreshToken') ? user['refreshToken']:null;
  }

  id?: string;
  email: string;
  password?: string;
  token?: string;
}
