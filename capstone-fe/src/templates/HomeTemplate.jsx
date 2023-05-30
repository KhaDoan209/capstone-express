import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
const HomeTemplate = () => {
   return (
      <>
         <Header />
         <Outlet />
      </>
   );
};

export default HomeTemplate;
