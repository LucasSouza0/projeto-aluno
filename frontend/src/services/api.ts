import axios from 'axios';
import { parseCookies } from 'nookies';

const cookie = parseCookies();

export const server = axios.create({
  baseURL: '/api',
  headers: {
    Authorization: `Bearer ${cookie['app.accessToken']}`
  }
});
