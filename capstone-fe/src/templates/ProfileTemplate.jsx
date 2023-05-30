import React from 'react';
import { Link } from 'react-router-dom';
import { signedInAccount } from '../utils/setting';
import { useLocation, useMatch } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import AvatarDefault from '../components/AvatarDefault';
const ProfileTemplate = () => {
   const signedInUser = JSON.parse(localStorage.getItem(signedInAccount));
   const location = useLocation();
   const currentPath = location.pathname;
   console.log(signedInUser.avatar);
   return (
      <div className='w-11/12 mt-16 mx-auto grid grid-cols-1 gap-4 '>
         <div className='items-center flex justify-center flex-col'>
            {signedInUser.avatar !== null ? (
               <img
                  src={signedInUser.avatar}
                  className='w-32 rounded-full'
               />
            ) : (
               <div className='w-20 h-20'>
                  <AvatarDefault ho_ten={signedInUser.ho_ten} />
               </div>
            )}

            <p className='text-sm text-slate-500 my-3'>@{signedInUser.email}</p>
            <h2 className='font-semibold text-3xl my-3'>
               {signedInUser.ho_ten}
            </h2>
            <div className='w-2/6 flex justify-center my-3'>
               <Link className='font-semibold bg-gray-200 py-2 px-4 rounded-full hover:bg-gray-300 ease-linear duration-100'>
                  Chia sẻ
               </Link>
               <Link className='ml-2 font-semibold bg-gray-200 py-2 px-4 rounded-full hover:bg-gray-300 ease-linear duration-100'>
                  Chỉnh sửa hồ sơ
               </Link>
            </div>
            <div className='w-2/6 flex justify-center my-3'>
               <Link
                  to='/posted-image'
                  className={
                     currentPath === '/posted-image'
                        ? 'ml-4 font-bold text-md border-b-2 border-black'
                        : 'ml-4 font-bold text-md '
                  }
               >
                  Đã tạo
               </Link>
               <Link
                  to='/saved-image'
                  className={
                     currentPath === '/saved-image'
                        ? 'ml-4 font-bold text-md border-b-2 border-black'
                        : 'ml-4 font-bold text-md '
                  }
               >
                  Đã lưu
               </Link>
            </div>
         </div>
         <Outlet />
      </div>
   );
};

export default ProfileTemplate;
