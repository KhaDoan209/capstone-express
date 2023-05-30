import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   listImage: [],
   imageDetail: {},
   savedImage: null,
   postedImage: [],
   listSavedImage: [],
};

const imageReducer = createSlice({
   name: 'imageReducer',
   initialState,
   reducers: {
      getListImageReducer: (state, action) => {
         state.listImage = action.payload;
      },
      getImageDetailReducer: (state, action) => {
         state.imageDetail = action.payload;
      },
      checkSavedImageReducer: (state, action) => {
         state.savedImage = action.payload;
      },
      getListPostedImageReducer: (state, action) => {
         state.postedImage = action.payload;
      },
      getListSavedImageReducer: (state, action) => {
         state.listSavedImage = action.payload;
      },
      clearImageReducer: (state, action) => {
         state.listImage = [];
         state.imageDetail = {};
         state.savedImage = null;
         state.postedImage = [];
      },
   },
});

export const {
   getListImageReducer,
   getImageDetailReducer,
   checkSavedImageReducer,
   getListPostedImageReducer,
   getListSavedImageReducer,
   clearImageReducer,
} = imageReducer.actions;

export default imageReducer.reducer;
