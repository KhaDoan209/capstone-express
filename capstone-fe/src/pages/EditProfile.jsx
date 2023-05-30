import React from 'react';
import { signedInAccount } from '../utils/setting';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import AvatarDefault from '../components/AvatarDefault';
import { useDispatch, useSelector } from 'react-redux';
const EditProfile = () => {
   const signedInUser = JSON.parse(localStorage.getItem(signedInAccount));
   const formik = useFormik({
      initialValues: {
         email: '',
         mat_khau: '',
      },
      validationSchema: Yup.object({
         email: Yup.string().required('Email cannot be empty'),
         mat_khau: Yup.string().required('Password cannot be empty'),
      }),
      onSubmit: (values) => {
         dispatch(loginAction(values, navigate));
      },
   });
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
                  {signedInUser.avatar !== null ? (
                     <img
                        className='w-12 h-12 rounded-full'
                        src={signedInUser.avatar}
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
                  <input
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
                     //onChange={formik.handleChange}
                     name='email'
                     type='email'
                     className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600 w-full'
                     placeholder='Email'
                  />
               </div>
               <div className='ml-3  w-1/2'>
                  <label className='block text-sm font-bold mb-1'>Họ tên</label>
                  <input
                     //onChange={formik.handleChange}
                     name='ho_ten'
                     type='text'
                     className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600 w-full'
                     placeholder='Họ tên'
                  />
               </div>
            </div>
            <div className='my-6 flex'>
               <div className='mr-3 w-1/2'>
                  <label className='block text-sm font-bold mb-1'>
                     Mật khẩu
                  </label>
                  <input
                     //onChange={formik.handleChange}
                     name='mat_khau'
                     type='text'
                     className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600 w-full'
                     placeholder='Mật khẩu mới'
                  />
               </div>
               <div className='ml-3 w-1/2'>
                  <label className='block text-sm font-bold mb-1'>Tuổi</label>
                  <input
                     //onChange={formik.handleChange}
                     name='tuoi'
                     type='number'
                     min={0}
                     className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600 w-full'
                     placeholder='Tuổi'
                  />
               </div>
            </div>
            <div className='my-6 flex justify-end w-11/12 mt-8'>
               <button className='mr-3 py-2 px-4 bg-gray-300 rounded-full ease-linear duration-200 font-bold hover:bg-gray-400'>
                  Thiết lập lại
               </button>
               <button className='ml-3 py-2 px-4 bg-red-600 text-white rounded-full ease-linear duration-200 font-bold hover:bg-red-700'>
                  Lưu
               </button>
            </div>
         </form>
      </div>
   );
};

export default EditProfile;
