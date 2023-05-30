import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signedInAccount } from '../utils/setting';
import { uploadImageAction } from '../redux/action/imageAction';
import AvatarDefault from '../components/AvatarDefault';
const UploadImage = () => {
   const [insertImage, setInsertImage] = useState(null);
   const dispatch = useDispatch();
   const signedInUser = JSON.parse(localStorage.getItem(signedInAccount));
   const handleUploadImage = (e) => {
      let file = e.target.files[0];
      if (
         file.type === 'image/jpeg' ||
         file.type === 'image/jpg' ||
         file.type === 'image/png'
      ) {
         setInsertImage(file.name);
         formik.setFieldValue('file', file);
      }
   };
   const formik = useFormik({
      initialValues: {
         mo_ta: '',
         tieu_de: '',
         id_nguoi_dung: signedInUser.id_nguoi_dung,
         file: null,
      },
      onSubmit: (values) => {
         let newImage = new FormData();
         if (values.file === null) {
            alert('Không thể đăng ảnh');
         } else {
            for (const key in values) {
               if (key !== 'image') {
                  if (key !== 'file') {
                     newImage.append(key, values[key]);
                  } else {
                     newImage.append('file', values.file, values.file.name);
                  }
               }
            }
            dispatch(uploadImageAction(newImage));
         }
      },
   });
   return (
      <div className='h-fit w-4/6 mx-auto px-10 my-10 rounded-2xl shadow-lg shadow-slate-300'>
         <div className='p-10 grid grid-cols-12 gap-4'>
            <div className='col-span-5'>
               <div className='bg-stone-200 p-5 rounded-xl'>
                  <div className='flex items-center justify-center w-full'>
                     <label
                        htmlFor='dropzone-file'
                        className='flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 h-96'
                     >
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                           <svg
                              aria-hidden='true'
                              className='w-10 h-10 mb-3 text-gray-400'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                              xmlns='http:www.w3.org/2000/svg'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth={2}
                                 d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                              />
                           </svg>

                           {insertImage === null ? (
                              <>
                                 <p className='mb-2 text-sm text-gray-500 '>
                                    <span className='font-semibold'>
                                       Kéo và thả
                                    </span>{' '}
                                    hoặc click vào để tải lên
                                 </p>
                              </>
                           ) : (
                              <div className='text-center overflow-auto break-all'>
                                 {insertImage}
                              </div>
                           )}
                        </div>
                        <input
                           onChange={handleUploadImage}
                           accept='image/png,image/jpg,image/jpeg'
                           id='dropzone-file'
                           type='file'
                           className='hidden'
                        />
                     </label>
                  </div>
                  <p className='w-4/5 mt-4 mx-auto text-xs text-gray-500 text-center'>
                     Bạn nên sử dụng tập tin chất lượng cao có kích thước dưới
                     20 MB
                  </p>
               </div>
            </div>
            <div className='col-span-7'>
               <form className='mx-8 space-y-8 mt-5 flex flex-col justify-between h-4/5'>
                  <div>
                     <input
                        onChange={formik.handleChange}
                        name='tieu_de'
                        type='text'
                        className='w-full text-stone-700 p-2 text-3xl font-bold border-x-0 border-t-0 border-b-2 outline-none  focus:border-b-red-600 focus:ring-0'
                        placeholder='Tạo tiêu đề'
                     />
                  </div>
                  <div className='flex flex-wrap items-center'>
                     {signedInUser.avatar !== null ? (
                        <img
                           className='w-12 h-12 rounded-full'
                           src={signedInUser.avatar}
                        />
                     ) : (
                        <div className='w-10 h-10'>
                           <AvatarDefault ho_ten={signedInUser.ho_ten} />
                        </div>
                     )}

                     <p className='ml-3 font-bold'>{signedInUser.email}</p>
                  </div>
                  <div>
                     <input
                        onChange={formik.handleChange}
                        name='mo_ta'
                        type='text'
                        className='w-full text-black p-2 text-md border-x-0 border-t-0 border-b-2 outline-none focus:border-b-red-600 focus:ring-0'
                        placeholder='Cho mọi người biết ảnh của bạn giới thiệu điều gì'
                     />
                  </div>
                  <button
                     type='button'
                     onClick={formik.handleSubmit}
                     className='block w-full mx-auto px-2 py-4 mt-2 text-white bg-red-600 rounded-full'
                  >
                     Đăng ảnh
                  </button>
               </form>
            </div>
         </div>
      </div>
   );
};

export default UploadImage;
