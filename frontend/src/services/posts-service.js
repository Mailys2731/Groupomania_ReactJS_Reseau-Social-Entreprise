import http from "../http-common";

class PostDataService {
  createPost(data) {
    return http.post("/posts/", data);
  }

  getPosts(data) {
    return http.get("/posts/", data);
  }

  getPost(id) {
    return http.get(`/posts/${id}`);
  }

  deletePost(id) {
    return http.delete(`/posts/${id}`);
  }

}


export default new PostDataService();