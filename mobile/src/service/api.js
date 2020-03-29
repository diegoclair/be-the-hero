import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.43:3333' 
  //ip address where the API is up
});

export default api;