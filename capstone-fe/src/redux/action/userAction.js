import {
   getUserDetailService,
   updateUserService,
} from '../../services/userService';
import { getUserDetailReducer } from '../reducer/userReducer';

export const getUserDetailAction = (id) => {
   return async (dispatch) => {
      try {
         let result = await getUserDetailService(id);
         dispatch(getUserDetailReducer(result.data));
      } catch (error) {
         console.log(error);
      }
   };
};

export const updateUserAction = (id, data) => {
   return async (dispatch) => {
      try {
         await updateUserService(id, data);
         let result = await getUserDetailService(id);
         dispatch(getUserDetailReducer(result.data));
         alert('Update thành công');
         console.log(result);
      } catch (error) {
         console.log(error);
      }
   };
};
