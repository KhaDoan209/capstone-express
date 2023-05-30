import { http } from './interceptor';

export const loginService = (data) => {
   return http.post(`auth/login`, data);
};
export const registerService = (data) => {
   return http.post(`auth/register`, data);
}; 
