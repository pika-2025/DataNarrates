// src/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000',  // adjust if your Flask server runs elsewhere
  withCredentials: true              // send and receive cookies
});
