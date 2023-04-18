import axios from 'axios';

const api = axios.create({
  //   baseURL:'https://blp-new-backend.vercel.app/',
  baseURL: 'https://blp-attendance-backend.vercel.app/',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})


export default api;