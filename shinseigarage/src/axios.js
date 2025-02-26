// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/usuarios', 
  timeout: 100000, 
});

export default instance;
