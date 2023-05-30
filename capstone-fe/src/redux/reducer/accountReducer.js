import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
   userLogedIn: {},
};

const accountReducer = createSlice({
   name: 'accountReducer',
   initialState,
   reducers: {
      loginReducer: (state, action) => {
         state.userLogedIn = action.payload;
      },
      logoutReducer: (state, action) => {
         state.userLogedIn = {};
      },
   },
});

export const { loginReducer, logoutReducer } = accountReducer.actions;

export default accountReducer.reducer;
