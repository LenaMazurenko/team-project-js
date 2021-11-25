export class User {
  constructor() {
    this.email = '';
    this.id = '';
    this.isLogin = false;
  }

  userLogin(email, id) {
    this.email = email;
    this.id = id;
    this.isLogin = true;
  }
  userLogout() {
    this.email = '';
    this.id = '';
    this.isLogin = false;
  }
}
