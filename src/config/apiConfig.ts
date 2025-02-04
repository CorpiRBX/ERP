import axios from 'axios';


const api = axios.create({
  // baseURL: 'https://localhost:7174/api/', 
  baseURL: 'http://localhost:5298/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;