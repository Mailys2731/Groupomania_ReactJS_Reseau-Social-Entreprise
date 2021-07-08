import http from "../http-common";

class UserDataService {
  signUp(data) {
    return http.post("/users/signup", data);
  }

  login(data) {
    return http.post("/users/login", data);
  }

  deleteUser(id) {
    return http.delete(`/users/${id}`);
  }
}

export default new UserDataService();
