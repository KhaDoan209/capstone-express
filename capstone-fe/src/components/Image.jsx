import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getImageDetailAction } from '../redux/action/imageAction';
import AvatarDefault from './AvatarDefault';
const Image = (props) => {
   let { duong_dan, id_hinh, id_nguoi_dung, mo_ta, nguoi_dung } = props.item;
   const dispatch = useDispatch();
   const navigate = useNavigate();
   return (
      <div className='col-span-2 my-4'>
         <div
            onClick={() => {
               navigate(`/image-detail/${id_hinh}`);
            }}
            className='overflow-hidden rounded-2xl cursor-pointer'
         >
            <img
               style={{ height: '400px' }}
               className='min-h-[250px] max-h-[400px] object-cover mx-auto 
               hover:scale-110 ease-in-out duration-300'
               src={duong_dan}
            />
         </div>
         <Link
            onClick={() => {
               dispatch(getImageDetailAction(id_hinh));
            }}
            to={`/image-detail/${id_hinh}`}
            className='ml-2 font-bold hover:text-red-600 ease-in-out duration-300 cursor-pointer overflow-hidden'
         >
            {mo_ta.length < 20 ? mo_ta : mo_ta.slice(0, 20) + ' ...'}
         </Link>
         <div className='flex items-center mt-2 ml-2'>
            {nguoi_dung.avatar !== null ? (
               <img
                  className='w-10 h-10 rounded-3xl'
                  src={nguoi_dung.avatar}
               />
            ) : (
               <div className='w-10 h-10'>
                  <AvatarDefault ho_ten={nguoi_dung.ho_ten} />
               </div>
            )}
            <p className='ml-3 text-sm font-semibold'>{nguoi_dung.email}</p>
         </div>
      </div>
   );
};

export default Image;
