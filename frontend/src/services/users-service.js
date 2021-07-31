import http from "../http-common";


const contentType = {
  'Content-type': 'application/json'
}

class UserDataService {
  signUp(data) {
    return http.post("/users/signup", data);
  }



  getOneUser = () => {
    const token = localStorage.getItem('token');
    const userId = JSON.parse(localStorage.getItem('userId'));
    return http.get(
      `users/${userId}`,
      {
        headers: {
          contentType,
          'Authorization': 'Bearer ' + token
        }
      }
    )
  }

}

export default new UserDataService()