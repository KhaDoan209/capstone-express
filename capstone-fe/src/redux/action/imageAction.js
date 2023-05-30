import {
   getListImageService,
   uploadImageService,
   getImageDetailService,
   checkSavedImageService,
   saveImageService,
   getListPostedImageService,
   getListSavedImageService,
} from '../../services/imageService';
import {
   checkSavedImageReducer,
   getImageDetailReducer,
   getListImageReducer,
   getListPostedImageReducer,
   getListSavedImageReducer,
} from '../reducer/imageReducer';
export const getListImageAction = () => {
   return async (dispatch) => {
      try {
         let result = await getListImageService();
         dispatch(getListImageReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getImageDetailAction = (id) => {
   return async (dispatch) => {
      try {
         let result = await getImageDetailService(id);
         dispatch(getImageDetailReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getListPostedImageAction = (id) => {
   return async (dispatch) => {
      try {
         let result = await getListPostedImageService(id);
         console.log(result.data);
         dispatch(getListPostedImageReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const getListSavedImageAction = (id) => {
   return async (dispatch) => {
      try {
         let result = await getListSavedImageService(id);
         dispatch(getListSavedImageReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const saveImageAction = (userId, imgId) => {
   return async (dispatch) => {
      try {
         await saveImageService(userId, imgId);
         let result = await checkSavedImageService(userId, imgId);
         dispatch(checkSavedImageReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const checkSavedImageAction = (userId, imgId) => {
   return async (dispatch) => {
      try {
         let result = await checkSavedImageService(userId, imgId);
         dispatch(checkSavedImageReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const uploadImageAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await uploadImageService(data);
         alert(result.message);
         location.reload();
      } catch (error) {
         console.log(error);
      }
   };
};
