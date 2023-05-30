import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer';
import imageReducer from './reducer/imageReducer';
import accountReducer from './reducer/accountReducer';
import commentReducer from './reducer/commentReducer';
export const store = configureStore({
   reducer: {
      imageReducer,
      userReducer,
      accountReducer,
      commentReducer,
   },
});
