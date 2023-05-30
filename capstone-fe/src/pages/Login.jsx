import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/action/accountAction';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
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
      <div className='w-11/12 mx-auto my-10'>
         <h1 className='font-semibold text-3xl text-center mt-2 mb-4'>
            Welcome to my picture
         </h1>
         <form>
            <div className='mb-6'>
               <label
                  htmlFor='email'
                  className='block mb-2 text-md text-gray-700 font-normal ml-1'
               >
                  Email
               </label>
               <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='email'
                  type='email'
                  id='email'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600  block w-full p-3'
                  placeholder='Email'
                  required
               />
               {formik.errors.email ? (
                  <p className='text-red-600 ml-1 pt-2'>
                     {formik.errors.email}
                  </p>
               ) : (
                  <></>
               )}
            </div>
            <div className='mb-6'>
               <label
                  htmlFor='password'
                  className='block mb-2 text-md text-gray-700 font-normal ml-1'
               >
                  Password
               </label>
               <input
                  name='mat_khau'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type='password'
                  id='password'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600  block w-full p-3'
                  placeholder='Password'
                  required
               />
               {formik.errors.mat_khau ? (
                  <p className='text-red-600 ml-1 pt-2'>
                     {formik.errors.mat_khau}
                  </p>
               ) : (
                  <></>
               )}
            </div>

            <button
               onClick={formik.handleSubmit}
               type='submit'
               className='text-white font-bold bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none rounded-3xl text-sm w-full px-5 py-3 text-center mt-3'
            >
               Đăng nhập
            </button>
         </form>
         <div className='w-full flex flex-wrap mt-8 mb-4 justify-center'>
            <h4>Chưa có tài khoản?</h4>
            <Link
               className='underline ml-2 hover:text-red-500 ease-in-out duration-300 font-semibold'
               to='/register'
            >
               Đăng ký ngay
            </Link>
         </div>
         <div className='w-full text-center text-stone-600 text-sm '>
            <Link
               to='/'
               className='font-normal hover:font-semibold ease-in-out duration-400'
            >
               Quay lại trang chủ
            </Link>
         </div>
      </div>
   );
};

export default Login;
