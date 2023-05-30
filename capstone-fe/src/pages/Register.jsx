import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { registerAction } from '../redux/action/accountAction';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Register = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const formik = useFormik({
      initialValues: {
         email: '',
         mat_khau: '',
         ho_ten: '',
         tuoi: '',
         avatar: '',
         repassword: '',
      },
      validationSchema: Yup.object({
         email: Yup.string()
            .required('Email không được để trống')
            .email('Email không hợp lệ'),
         mat_khau: Yup.string().required('Mật khẩu không được để trống'),
         repassword: Yup.string().required('Vui lòng nhập lại mật khẩu'),
      }),
      onSubmit: (values) => {
         if (values.mat_khau !== values.repassword) {
            alert('Mật khẩu không trùng khớp');
         } else {
            let newUser = {
               email: values.email,
               mat_khau: values.mat_khau,
               ho_ten: values.ho_ten,
               tuoi: Number(values.tuoi),
               avatar: values.avatar,
            };
            dispatch(registerAction(newUser, navigate));
         }
      },
   });
   return (
      <div className='w-11/12 mx-auto'>
         <h1 className='font-semibold text-3xl text-center my-2'>
            Welcome to my picture
         </h1>
         <p className='text-stone-500 text-center mt-1 mb-4 w-full'>
            Tìm những ý tưởng mới để thử
         </p>
         <form>
            <div className='mb-3'>
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
            <div className='mb-3'>
               <label
                  htmlFor='password'
                  className='block mb-2 text-md text-gray-700 font-normal ml-1'
               >
                  Mật khẩu
               </label>
               <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='mat_khau'
                  type='text'
                  id='password'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600  block w-full p-3'
                  placeholder='Mật khẩu'
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
            <div className='mb-3'>
               <label
                  htmlFor='password'
                  className='block mb-2 text-md text-gray-700 font-normal ml-1'
               >
                  Nhập lại mật khẩu
               </label>
               <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='repassword'
                  type='text'
                  id='password'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600  block w-full p-3'
                  placeholder='Nhập lại mật khẩu'
               />
               {formik.errors.repassword ? (
                  <p className='text-red-600 ml-1 pt-2'>
                     {formik.errors.repassword}
                  </p>
               ) : (
                  <></>
               )}
            </div>
            <div className='mb-3'>
               <label
                  htmlFor='hoten'
                  className='block mb-2 text-md text-gray-700 font-normal ml-1'
               >
                  Họ tên
               </label>
               <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='ho_ten'
                  type='text'
                  id='hoten'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600  block w-full p-3'
                  placeholder='Họ tên'
               />
            </div>
            <div className='mb-3'>
               <label
                  htmlFor='age'
                  className='block mb-2 text-md text-gray-700 font-normal ml-1'
               >
                  Tuổi
               </label>
               <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='tuoi'
                  type='text'
                  id='age'
                  className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-none focus:ring-2 focus:ring-red-600  block w-full p-3'
                  placeholder='Tuổi'
               />
            </div>
            <button
               onClick={formik.handleSubmit}
               type='submit'
               className='text-white font-bold bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none rounded-3xl text-sm w-full px-5 py-3 text-center mt-3'
            >
               Đăng ký
            </button>
         </form>
         <div className='w-full flex flex-wrap mt-8 justify-center'>
            <h4>Đã có tài khoản?</h4>
            <Link
               className='underline ml-2 hover:text-red-500 ease-in-out duration-300 font-semibold'
               to='/login'
            >
               Đăng nhập
            </Link>
         </div>
         <div className='w-full text-center text-stone-600 text-sm mt-4'>
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

export default Register;
