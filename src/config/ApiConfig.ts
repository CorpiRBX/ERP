import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.16.143.112:5001/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;