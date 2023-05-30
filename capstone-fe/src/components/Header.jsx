import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, signedInAccount } from '../utils/setting';
import { logoutAction } from '../redux/action/accountAction';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useMatch } from 'react-router-dom';
import { useEffect } from 'react';
import jwt from 'jwt-decode';
const Header = () => {
   const isLogin = JSON.parse(localStorage.getItem(signedInAccount));
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const location = useLocation();
   const currentPath = location.pathname;
   const match = useMatch(currentPath);
   useEffect(() => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
         const decodedToken = jwt(token);
         const currentTime = Date.now() / 1000;
         if (decodedToken.exp < currentTime) {
            console.log('Hết hạn');
            dispatch(logoutAction());
         }
      }
   }, []);
   return (
      <>
         <div className='container w-9/12 mx-auto grid grid-cols-12 gap-4 my-4 items-center text-center'>
            <div className='col-span-2 flex justify-between'>
               <Link
                  className={
                     match
                        ? 'text-white bg-black font-bold rounded-3xl flex p-2 items-center'
                        : 'hover:bg-black hover:text-white font-bold flex text-center rounded-3xl p-2 items-center'
                  }
                  to='/home'
               >
                  Trang chủ
               </Link>
               {isLogin !== null ? (
                  <div>
                     <div>
                        <button
                           id='createImageButton'
                           data-dropdown-toggle='createImageDropdown'
                           className='flex items-center hover:bg-black hover:text-white p-3 rounded-3xl font-bold'
                           type='button'
                        >
                           Tạo
                        </button>
                        <div
                           id='createImageDropdown'
                           className='z-10 hidden bg-white divide-y divide-gray-100  rounded-lg shadow w-44 '
                        >
                           <ul
                              className='py-2 text-sm text-gray-700 dark:text-gray-200'
                              aria-labelledby='createImageButton'
                           >
                              <li>
                                 <Link
                                    onClick={() => {
                                       document
                                          .getElementById('createImageButton')
                                          .click();
                                    }}
                                    to='/upload-image'
                                    className='block px-4 py-2 hover:bg-gray-100 font-bold'
                                 >
                                    Đăng ảnh
                                 </Link>
                              </li>
                              <li>
                                 <Link
                                    onClick={() => {
                                       document
                                          .getElementById('createImageButton')
                                          .click();
                                    }}
                                    to='/saved-image'
                                    className='block px-4 py-2 hover:bg-gray-100 font-bold'
                                 >
                                    Ảnh đã lưu
                                 </Link>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               ) : (
                  <></>
               )}
            </div>
            <div className={isLogin !== null ? 'col-span-8' : 'col-span-7'}>
               <input
                  placeholder='Tìm kiếm'
                  className='w-full bg-gray-200 outline-none border-transparent focus:outline-none rounded-3xl pl-4'
                  type='text'
               />
            </div>
            <div className={isLogin !== null ? 'col-span-2' : 'col-span-3'}>
               {isLogin ? (
                  <div className='flex flex-wrap justify-between items-center'>
                     <div>
                        <i className='fa-solid fa-bell text-xl text-stone-500 cursor-pointer'></i>
                     </div>
                     <div>
                        <i className='fa-solid fa-comment-dots text-xl  text-stone-500 cursor-pointer'></i>
                     </div>
                     <div>
                        <button
                           id='profileDropdownButton'
                           data-dropdown-toggle='profile'
                           className='flex items-center hover:bg-black hover:text-white p-3 rounded-3xl font-bold profile'
                           type='button'
                           onClick={() => {
                              console.log('open');
                           }}
                        >
                           <i className='fa-solid fa-user text-stone-500'></i>
                           <svg
                              className='w-4 h-4 ml-2'
                              aria-hidden='true'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth={2}
                                 d='M19 9l-7 7-7-7'
                              />
                           </svg>
                        </button>
                        <div
                           id='logout-modal'
                           tabIndex={-1}
                           className='fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
                        >
                           <div className='relative w-full max-w-md max-h-full'>
                              <div className='relative bg-white rounded-lg shadow '>
                                 <button
                                    type='button'
                                    className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center '
                                    data-modal-hide='logout-modal'
                                 >
                                    <svg
                                       aria-hidden='true'
                                       className='w-5 h-5'
                                       fill='currentColor'
                                       viewBox='0 0 20 20'
                                       xmlns='http://www.w3.org/2000/svg'
                                    ></svg>
                                    <span className='sr-only'>Close modal</span>
                                 </button>
                                 <div className='p-6 text-center'>
                                    <h3 className='mb-5 text-lg font-normal text-gray-500 '>
                                       Do you want to log out ?
                                    </h3>
                                    <button
                                       onClick={() => {
                                          dispatch(logoutAction(navigate));
                                       }}
                                       data-modal-hide='logout-modal'
                                       type='button'
                                       className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                                    >
                                       Đăng xuất
                                    </button>
                                    <button
                                       data-modal-hide='logout-modal'
                                       type='button'
                                       className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 '
                                    >
                                       Không, cảm ơn
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div
                           id='profile'
                           className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 '
                        >
                           <ul className='py-2 text-sm text-gray-700 '>
                              <li>
                                 <Link
                                    to={`/edit-profile/${isLogin.id_nguoi_dung}`}
                                    className='block px-4 py-2 hover:bg-gray-100  font-bold'
                                 >
                                    Xem Profile
                                 </Link>
                              </li>
                              <li>
                                 <a
                                    href='#'
                                    className='block px-4 py-2 hover:bg-gray-100  font-bold'
                                    data-modal-target='logout-modal'
                                    data-modal-toggle='logout-modal'
                                 >
                                    Đăng xuất
                                 </a>
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               ) : (
                  <>
                     <div className='ml-2 flex flex-wrap justify-around items-center'>
                        <NavLink
                           to='/login'
                           className=' hover:bg-black hover:text-white p-3 font-bold rounded-3xl'
                        >
                           Đăng nhập
                        </NavLink>
                        <NavLink
                           to='/register'
                           className=' hover:bg-black hover:text-white p-3 font-bold rounded-3xl'
                        >
                           Đăng ký
                        </NavLink>
                     </div>
                  </>
               )}
            </div>
         </div>
      </>
   );
};

export default Header;
