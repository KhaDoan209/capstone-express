import React from 'react';

const AvatarDefault = (props) => {
   let { ho_ten } = props;

   const generateImageDefault = (name) => {
      let nameArray = name.split(' ');
      let firstNameArray = nameArray[nameArray.length - 1].split('');
      return firstNameArray[0];
   };
   return (
      <div className='font-bold text-black rounded-full bg-gray-200 flex items-center justify-center text-xl w-full h-full border-2 '>
         {generateImageDefault(ho_ten)}
      </div>
   );
};

export default AvatarDefault;
