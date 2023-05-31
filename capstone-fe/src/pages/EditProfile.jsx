import React from 'react';
import { signedInAccount } from '../utils/setting';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import AvatarDefault from '../components/AvatarDefault';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
   getUserDetailAction,
   updateUserAction,
} from '../redux/action/userAction';
import { useState } from 'react';
const EditProfile = () => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const [avatarUpload, setAvatarUpload] = useState(null);
   useEffect(() => {
      dispatch(getUserDetailAction(id));
   }, []);
   const signedInUser = JSON.parse(localStorage.getItem(signedInAccount));
   const { id_nguoi_dung, email, mat_khau, avatar, tuoi, ho_ten } = useSelector(
      (state) => state.userReducer.userDetail
   );
   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         email,
         tuoi,
         avatar,
         file: null,
      },
      onSubmit: (values) => {
         let userUpdate = new FormData();
         if (values.file === null) {
            dispatch(updateUserAction(id_nguoi_dung, values));
         } else {
            for (const key in values) {
               if (key !== 'image') {
                  if (key !== 'file') {
                     userUpdate.append(key, values[key]);
                  } else {
                     userUpdate.append('file', values.file, values.file.name);
                  }
               }
            }
            dispatch(updateUserAction(id_nguoi_dung, userUpdate));
         }
      },
   });
   const handleUploadAvatar = (e) => {
      let file = e.target.files[0];
      if (
         file.type === 'image/jpeg' ||
         file.type === 'image/jpg' ||
         file.type === 'image/png'
      ) {
         setAvatarUpload(file.name);
         formik.setFieldValue('file', file);
      }
   };
   return (
      <div className='flex justify-left w-2/5 mx-auto mt-10'>
         <form className='w-4/5 mx-auto'>
            <h1 className='text-3xl font-semibold'>Hồ sơ công khai</h1>
            <p className='my-6 text-base text-gray-800'>
               Người truy cập hồ sơ của bạn sẽ thấy thông tin sau
            </p>
            <div className='my-6'>
               <h4 className='font-bold text-xl mb-4'>Ảnh</h4>
               <div className='flex flex-wrap justify-around items-center w-2/5'>
                  {avatar !== null ? (
                     <img
                        className='w-12 h-12 rounded-full'
                        src={avatar}
                     />
                  ) : (
                     <div className='w-16 h-16'>
                        <AvatarDefault ho_ten={signedInUser.ho_ten} />
                     </div>
                  )}

                  <label
                     className='py-3 px-4 rounded-full bg-gray-200 cursor-pointer font-bold hover:bg-red-600 hover:text-white duration-200 ease-linear'
                     htmlFor='uploadAvatar'
                  >
                     Thay đổi
                  </label>
                  <div className='w-full'>
                     {avatarUpload !== null ? (
                        <p className='mt-3'>{avatarUpload}</p>
                     ) : (
                        <></>
                     )}
                  </div>
                  <input
                     onChange={handleUploadAvatar}
                     id='uploadAvatar'
                     className='hidden'
                     type='file'
                  />
               </div>
            </div>
            <div className='my-6 flex'>
               <div className='mr-3 w-1/2'>
                  <label className='block text-sm font-bold mb-1'>Email</label>
                  <input
                     onChange={formik.handleChange}
                     name='email'
                     type='email'
                     className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600 w-full'
                     defaultValue={email}
                  />
               </div>
               <div className='ml-3  w-1/2'>
                  <label className='block text-sm font-bold mb-1'>Họ tên</label>
                  <input
                     onChange={formik.handleChange}
                     name='ho_ten'
                     type='text'
                     className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600 w-full'
                     placeholder='Họ tên'
                     defaultValue={ho_ten}
                  />
               </div>
            </div>
            <div className='my-6 flex'>
               <div className='mr-3 w-1/2'>
                  <label className='block text-sm font-bold mb-1'>
                     Mật khẩu
                  </label>
                  <input
                     onChange={formik.handleChange}
                     name='mat_khau'
                     type='text'
                     className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600 w-full'
                     placeholder='Mật khẩu mới'
                  />
               </div>
               <div className='ml-3 w-1/2'>
                  <label className='block text-sm font-bold mb-1'>Tuổi</label>
                  <input
                     onChange={formik.handleChange}
                     name='tuoi'
                     type='number'
                     min={0}
                     className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600 w-full'
                     defaultValue={tuoi}
                  />
               </div>
            </div>
            <div className='my-6 flex justify-end w-11/12 mt-8'>
               <button className='mr-3 py-2 px-4 bg-gray-300 rounded-full ease-linear duration-200 font-bold hover:bg-gray-400'>
                  Thiết lập lại
               </button>
               <button
                  onClick={formik.handleSubmit}
                  className='ml-3 py-2 px-4 bg-red-600 text-white rounded-full ease-linear duration-200 font-bold hover:bg-red-700'
               >
                  Lưu
               </button>
            </div>
         </form>
      </div>
   );
};

export default EditProfile;
