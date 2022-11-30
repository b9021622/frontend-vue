import axios from 'axios';

const API_URL = 'http://localhost:3050/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'Lsignin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        console.log(response.data)
        return response.data;
      });
  }
  loginStudent(user) {
    return axios
      .post(API_URL + 'Ssignin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        console.log(response.data)
        return response.data;
      });
  }

  logout() {
    console.log("Logging out")
    localStorage.removeItem('user');
  }
  register(user) {
    return axios.post(API_URL + 'Lecsignup', {
      username: user.username,
      FName : user.FName,
      SName: user.SName,
      password: user.password
    });
  }
  registerStudent(user) {
    return axios.post(API_URL + 'signupStu', {
      username: user.username,
      FName : user.FName,
      SName: user.SName,
      password: user.password
    });
  }
}

export default new AuthService();