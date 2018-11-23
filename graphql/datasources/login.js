const { RESTDataSource } = require('apollo-datasource-rest');

class LoginAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000';
  }

  async loginUser({email, pass}) {
    const res = await this.post('/api/account/login', {email, password: pass})
    return this.loginReducer(res);
  }

  loginReducer(login) {
    return {
      email: login.extras.userProfileModel.email,
      username: login.extras.userProfileModel.username,
      id: login.extras.userId,
      msg: login.extras.msg,
      // cursor: `${login.launch_date_unix}`,
    };
  }
}

module.exports = LoginAPI;