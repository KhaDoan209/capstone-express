import React from 'react';
import { Outlet } from 'react-router-dom';
const FormTemplate = () => {
   return (
      <div className='w-4/12 mx-auto flex flex-col justify-between my-6 h-50'>
         <div className='bg-white py-20 px-12 rounded-2xl shadow-xl -gray-700/40'>
            <Outlet />
         </div>
      </div>
   );
};

export default FormTemplate;
