import { http } from './interceptor';

export const getCommentByImageService = (id) => {
   return http.get(`images/get-comment-by-image/${id}`);
};


export const createCommentService = (data) => {
   return http.post(`comments/create-comment`, data);
};
