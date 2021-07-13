import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json",
    
    //"Authorisation": localStorage.getItem('userTokenLog')
    
  }
});

/*(function() {
  String token = store.getState().session.token;
  if (token) {
      axios.defaults.headers.common['Authorization'] = token;
  } else {
      axios.defaults.headers.common['Authorization'] = null;
      /*if setting null does not remove `Authorization` header then try     
        delete axios.defaults.headers.common['Authorization'];
      
  }
})();*/