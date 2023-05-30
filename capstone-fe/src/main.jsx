import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import FormTemplate from './templates/FormTemplate.jsx';
import HomeTemplate from './templates/HomeTemplate.jsx';
import { Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import SavedImage from './pages/SavedImage.jsx';
import PostedImage from './pages/PostedImage.jsx';
import EditProfile from './pages/EditProfile.jsx';
import ImageDetail from './pages/ImageDetail.jsx';
import UploadImage from './pages/UploadImage.jsx';
import ProfileTemplate from './templates/ProfileTemplate.jsx';
import './assets/scss/main.scss';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/configStore.js';

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <BrowserRouter>
         <Routes>
            <Route
               path=''
               element={<App />}
            >
               <Route element={<HomeTemplate />}>
                  <Route
                     index
                     path='/'
                     element={<Home />}
                  />
                  <Route
                     path='/upload-image'
                     element={<UploadImage />}
                  />
                  <Route
                     path='/image-detail/:id'
                     element={<ImageDetail />}
                  />
                  <Route
                     path='/edit-profile/:id'
                     element={<EditProfile />}
                  />
                  <Route element={<ProfileTemplate />}>
                     <Route
                        path='/posted-image'
                        element={<PostedImage />}
                     />
                     <Route
                        path='/saved-image'
                        element={<SavedImage />}
                     />
                  </Route>
                  <Route
                     path='/*'
                     element={<Navigate to={'/'} />}
                  />
               </Route>
               <Route element={<FormTemplate />}>
                  <Route
                     path='/login'
                     element={<Login />}
                  />
                  <Route
                     path='/register'
                     element={<Register />}
                  />
               </Route>
            </Route>
         </Routes>
      </BrowserRouter>
   </Provider>
);
