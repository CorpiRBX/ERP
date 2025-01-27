import axios from 'axios';


const api = axios.create({
  // baseURL: 'https://localhost:7174/api/', 
  baseURL: 'http://172.16.143.112:5298/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;