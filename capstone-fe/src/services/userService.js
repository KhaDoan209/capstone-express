import { http } from './interceptor';

export const getUserDetailService = (id) => {
   return http.get(`user/get-user-detail/${id}`);
};

export const updateUserService = (id, data) => {
   return http.put(`user/update-user-information/${id}`, data);
};
