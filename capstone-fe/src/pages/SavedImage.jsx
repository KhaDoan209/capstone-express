import { useDispatch } from 'react-redux';
import { getListSavedImageAction } from '../redux/action/imageAction';
import { signedInAccount } from '../utils/setting';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import Image from '../components/Image';
const SavedImage = (props) => {
   const dispatch = useDispatch();
   const signedInUser = JSON.parse(localStorage.getItem(signedInAccount));
   useEffect(() => {
      dispatch(getListSavedImageAction(signedInUser.id_nguoi_dung));
   }, []);
   const listSavedImage = useSelector(
      (state) => state.imageReducer.listSavedImage
   );
   return (
      <>
         {listSavedImage.length > 0 ? (
            <div className='w-11/12 my-8 mx-auto grid grid-cols-12 gap-4 '>
               {listSavedImage.map((item) => {
                  return (
                     <Fragment key={item.id_hinh}>
                        <Image item={item.hinh_anh} />
                     </Fragment>
                  );
               })}
            </div>
         ) : (
            <h1 className='font-semibold text-4xl mt-20 text-center'>
               Bạn chưa lưu ảnh nào
            </h1>
         )}
      </>
   );
};

export default SavedImage;
