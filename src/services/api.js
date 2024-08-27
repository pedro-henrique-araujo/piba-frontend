import axios from "axios";
import environment from "../environment";

const api = axios.create({
  baseURL: environment.backendUrl,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
});

export default api;
