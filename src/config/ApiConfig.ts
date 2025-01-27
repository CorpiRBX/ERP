import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://localhost:7172/api/', 
  baseURL: 'https://172.16.143.74:7172/api/', 
  // baseURL: 'https://127.0.0.1:7172/api/', 
  // baseURL: 'https://172.16.143.112:7174/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;