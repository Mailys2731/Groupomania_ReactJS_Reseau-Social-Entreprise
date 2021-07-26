import axios from 'axios'

export function login(data) {
    return dispatch => {
    return axios.post("api/users", data).then(res =>{
        const token = res.data.token;
        localStorage.setItem('jwtToken', token)
    });
    }
  }