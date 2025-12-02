// import Sidebar from '@/components/Sidebar'
// import BMI from '@/pages/UserDashbord/BMI'
// import Plans from '@/pages/UserDashbord/Plans'
// import UserProfile from '@/pages/UserDashbord/UserProfile'
// import React from 'react'

// const UserDashbordLayout = () => {
//   return (
//     <>
//     <Sidebar/>
//     <UserProfile/>
//     <BMI/>
//     <Plans/>
//     </>
//   )
// }

// export default UserDashbordLayout



import Sidebar from '@/components/Sidebar'
import { Outlet } from "react-router-dom";
import React from 'react'

const UserDashbordLayout = () => {
  
  return (
    <>
      <Sidebar />
      <div className="ml-64 p-6"> 
        <Outlet />   
      </div>
    </>
  );
};

export default UserDashbordLayout;
