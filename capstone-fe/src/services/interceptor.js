import axios from 'axios';
import { Domain } from '../utils/setting';
import { ACCESS_TOKEN } from '../utils/setting';
export const http = axios.create();

http.interceptors.request.use(
   (config) => {
      config.baseURL = Domain;
      config.headers = {
         Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
      };
      return config;
   },
   (error) => {
      return Promise.reject.error(error);
   }
);

http.interceptors.response.use(
   (response) => {
      if (response.data) {
         return response.data;
      }
      return response;
   },
   (error) => {
      if (error.response.data) {
         console.log(error.response.data);
         return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
   }
);
