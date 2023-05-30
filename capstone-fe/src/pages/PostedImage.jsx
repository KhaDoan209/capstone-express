import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getListPostedImageAction } from '../redux/action/imageAction';
import { signedInAccount } from '../utils/setting';
import { useSelector } from 'react-redux';
import Image from '../components/Image';
const PostedImage = () => {
   const dispatch = useDispatch();
   const signedInUser = JSON.parse(localStorage.getItem(signedInAccount));
   useEffect(() => {
      dispatch(getListPostedImageAction(signedInUser.id_nguoi_dung));
   }, []);
   const listPostedImage = useSelector(
      (state) => state.imageReducer.postedImage
   );
   return (
      <>
         {listPostedImage.length > 0 ? (
            <div className='w-11/12 my-8 mx-auto grid grid-cols-12 gap-4 '>
               {listPostedImage.map((item) => {
                  return (
                     <Fragment key={item.id_hinh}>
                        <Image item={item} />
                     </Fragment>
                  );
               })}
            </div>
         ) : (
            <h1 className='font-semibold text-4xl mt-20 text-center'>
               Bạn chưa đăng ảnh nào
            </h1>
         )}
      </>
   );
};

export default PostedImage;
