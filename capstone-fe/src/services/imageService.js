import { http } from './interceptor';

export const getListImageService = () => {
   return http.get(`images/get-list-image`);
};

export const getImageDetailService = (id) => {
   return http.get(`images/get-image-detail/${id}`);
};

export const getListPostedImageService = (id) => {
   return http.get(`images/get-list-image-by-user/${id}`);
};

export const getListSavedImageService = (id) => {
   return http.get(`images/get-saved-image-by-user/${id}`);
};

export const checkSavedImageService = (userId, imgId) => {
   return http.get(
      `images/check-stored-image/?userId=${userId}&imgId=${imgId}`
   );
};
export const saveImageService = (userId, imgId) => {
   return http.post(`images/save-image/?userId=${userId}&imgId=${imgId}`);
};

export const uploadImageService = (data) => {
   return http.post(`images/upload-image`, data);
};
