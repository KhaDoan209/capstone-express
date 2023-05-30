import { loginService, registerService } from '../../services/accountService';
import { loginReducer } from '../reducer/accountReducer';
import { logoutReducer } from '../reducer/accountReducer';
import { ACCESS_TOKEN, signedInAccount } from '../../utils/setting';
import { clearImageReducer } from '../reducer/imageReducer';

export const loginAction = (account, navigate) => {
   return async (dispatch) => {
      try {
         let result = await loginService(account);
         localStorage.setItem(ACCESS_TOKEN, result.data.data);
         localStorage.setItem(
            signedInAccount,
            JSON.stringify(result.data.decodedData.data)
         );
         dispatch(loginReducer(result.data.decodedData.data));
         alert('Login successfully');
         navigate('/');
         location.reload();
      } catch (error) {
         console.log(error);
      }
   };
};

export const registerAction = (account, navigate) => {
   return async () => {
      try {
         let result = await registerService(account);
         console.log(result);
      } catch (error) {
         console.log(error);
      }
   };
};
export const logoutAction = (navigate) => {
   return async (dispatch) => {
      try {
         localStorage.removeItem(ACCESS_TOKEN);
         localStorage.removeItem(signedInAccount);
         dispatch(logoutReducer());
         dispatch(clearImageReducer());
         navigate('/');
      } catch (error) {
         console.log(error);
      }
   };
};
