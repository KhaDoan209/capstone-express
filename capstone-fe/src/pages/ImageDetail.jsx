import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
   getImageDetailAction,
   checkSavedImageAction,
   saveImageAction,
} from '../redux/action/imageAction';
import {
   createCommentAction,
   getCommentByImageAction,
} from '../redux/action/commentAction';
import { useState } from 'react';
import { signedInAccount } from '../utils/setting';
import { useRef } from 'react';
import { ACCESS_TOKEN } from '../utils/setting';
const ImageDetail = () => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const [openCmt, setOpenCmt] = useState(false);
   const signedInUser = JSON.parse(localStorage.getItem(signedInAccount));
   const navigate = useNavigate();
   const imageDetail = useSelector((state) => state.imageReducer.imageDetail);
   const comment = useSelector((state) => state.commentReducer.comment);
   const isSaved = useSelector((state) => state.imageReducer.savedImage);

   const commentRef = useRef(null);
   const [cmtContent, setCmtContent] = useState({
      id_nguoi_dung: signedInUser?.id_nguoi_dung,
      id_hinh: Number(id),
      noi_dung: '',
   });

   useEffect(() => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
         dispatch(getImageDetailAction(id));
         dispatch(getCommentByImageAction(id));
         dispatch(
            checkSavedImageAction(signedInUser.id_nguoi_dung, Number(id))
         );
      } else {
         navigate('/login');
      }
   }, []);

   const handleChangeComment = (e) => {
      setCmtContent({
         ...cmtContent,
         [e.target.name]: e.target.value.trim(),
      });
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createCommentAction(cmtContent));
      commentRef.current.value = '';
   };
   const handleSaveImage = (e) => {
      e.preventDefault();
      dispatch(saveImageAction(signedInUser?.id_nguoi_dung, Number(id)));
   };

   return (
      <div className='bg-white mt-16 w-8/12 mx-auto grid grid-cols-12 h-[550px] drop-shadow-2xl rounded-3xl'>
         <div className='col-span-6 overflow-hidden'>
            <img
               className='w-full h-full object-cover rounded-l-3xl p-px'
               src={imageDetail.duong_dan}
            />
         </div>
         <div className='col-span-6'>
            <div className='p-8 overflow-auto break-all'>
               <div className='flex justify-end'>
                  {isSaved !== null && isSaved.isSaved == true ? (
                     <button
                        onClick={handleSaveImage}
                        className='bg-black text-white px-6 py-3 rounded-full'
                     >
                        Đã Lưu
                     </button>
                  ) : (
                     <button
                        onClick={handleSaveImage}
                        className='bg-red-600 text-white px-6 py-3 rounded-full'
                     >
                        Lưu
                     </button>
                  )}
               </div>
               <h2 className='mt-8 mb-4 font-semibold text-3xl overflow-hidden'>
                  {imageDetail.tieu_de ? (
                     imageDetail.tieu_de
                  ) : (
                     <p>Image Detail</p>
                  )}
               </h2>
               <p className='text-justify wrap my-4 break-all'>
                  {imageDetail.mo_ta}
               </p>
               <div
                  onClick={() => {
                     setOpenCmt(!openCmt);
                  }}
                  className='flex items-center cursor-pointer mt-2 mb-4'
               >
                  <h2 className='text-xl font-semibold'>
                     {comment?.length} Nhận xét
                  </h2>
                  {openCmt ? (
                     <i className='fa-solid fa-chevron-up ml-2'></i>
                  ) : (
                     <i className='fa-solid fa-chevron-down ml-2'></i>
                  )}
               </div>
               <div className='max-h-[200px] overflow-auto'>
                  {openCmt ? (
                     comment.map((item) => {
                        const currentDate = new Date();
                        const ngay_binh_luan = new Date(item.ngay_binh_luan);
                        const timeDiff = currentDate - ngay_binh_luan;
                        return (
                           <Fragment key={item.id_binh_luan}>
                              <div className='flex flex-wrap items-stretch my-4'>
                                 <img
                                    src={item.nguoi_dung?.avatar}
                                    className='w-8 rounded-full object-contain'
                                 />
                                 <div className='ml-4'>
                                    <div className='flex flex-wrap'>
                                       <h3 className='font-bold'>
                                          {item.nguoi_dung.email}:
                                       </h3>
                                       &nbsp;
                                       <p> {item.noi_dung}</p>
                                    </div>
                                    <p className='text-sm text-slate-600'>
                                       {Math.floor(
                                          timeDiff / (1000 * 60 * 60 * 24)
                                       )}{' '}
                                       days ago
                                    </p>
                                 </div>
                              </div>
                           </Fragment>
                        );
                     })
                  ) : (
                     <></>
                  )}
               </div>
               <div className='flex flex-wrap mt-5'>
                  <div className='w-1/6'>
                     <img
                        src={signedInUser?.avatar}
                        className='w-10 mx-auto'
                     />
                  </div>
                  <div className='w-5/6 relative'>
                     <input
                        ref={commentRef}
                        className='w-full rounded-full ring-0 focus:ring-0 border-2 border-stone-200 focus:border-red-500'
                        type='text'
                        placeholder='Thêm nhận xét'
                        onChange={handleChangeComment}
                        name='noi_dung'
                     />
                     <button
                        onClick={handleSubmit}
                        className='absolute top-2.5 right-4 z-10
                     font-semibold hover:text-red-600 ease-in-out duration-200'
                     >
                        Gửi
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ImageDetail;
