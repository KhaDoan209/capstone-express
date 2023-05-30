import React, { Fragment } from 'react';
import Image from '../components/Image';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getListImageAction } from '../redux/action/imageAction';
import { useSelector } from 'react-redux';
const Home = () => {
   const dispatch = useDispatch();
   const listImage = useSelector((state) => state.imageReducer.listImage);
   useEffect(() => {
      dispatch(getListImageAction());
   }, []);

   return (
      <div className='w-11/12 mt-16 mx-auto grid grid-cols-12 gap-4'>
         {listImage.map((item) => {
            return (
               <Fragment key={item.id_hinh}>
                  <Image item={item} />
               </Fragment>
            );
         })}
      </div>
   );
};

export default Home;
