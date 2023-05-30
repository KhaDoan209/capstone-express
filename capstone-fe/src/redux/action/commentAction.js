import {
   createCommentService,
   getCommentByImageService,
} from '../../services/commentService';
import { getCommentByImageReducer } from '../reducer/commentReducer';

export const getCommentByImageAction = (id) => {
   return async (dispatch) => {
      try {
         let data = await getCommentByImageService(id);
         dispatch(getCommentByImageReducer(data.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const createCommentAction = (comment) => {
   return async (dispatch) => {
      try {
         await createCommentService(comment);
         let data = await getCommentByImageService(comment.id_hinh);
         dispatch(getCommentByImageReducer(data.data));
      } catch (error) {
         console.log(error);
      }
   };
};

