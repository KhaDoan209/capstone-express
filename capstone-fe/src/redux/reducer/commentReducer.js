import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   comment: {},
};

const commentReducer = createSlice({
   name: 'commentReducer',
   initialState,
   reducers: {
      getCommentByImageReducer: (state, action) => {
         state.comment = action.payload;
      },
   },
});

export const { getCommentByImageReducer } = commentReducer.actions;

export default commentReducer.reducer;
