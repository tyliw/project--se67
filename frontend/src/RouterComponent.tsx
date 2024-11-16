import React, { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignInPages from './authentication/Login';
import LayoutFoodService from './food_service/page/layout/LayoutFoodService';

const RouterComponent: React.FC = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignInPages />, // เส้นทางหลักคือหน้า Login
    },
    {
      path: '/login',
      element: <LayoutFoodService />, // เส้นทางหลังจาก login สำเร็จ
      // children: [
      //   { path: 'dashboard', element: <Dashboard/> },

      //   // Room
      //   { path: 'room', 
      //     element: <Booking /> 
      //   },
      //   { path: 'customer', 
      //     element: <CustomerCreate /> 
      //   },

      //   // Food Service
      //   {
      //     path: 'food-service',
      //     element: <BookingList />,
      //   },
      //   {
      //     path: 'food-service/structure/:bookingID',
      //     element: <Structure />,
      //   },
      //   { path: 'manage-data', 
      //     element: <Edit /> 
      //   },
      //   { path: 'manage-data/create-menu', 
      //     element: <Create /> 
      //   },

      //   // Employee
      //   { path: 'employee', element: <Home /> },
      //   { path: 'employee/create', element: <UserCreate /> },
      //   { path: 'employee/update/:id', element: <UsersUpdate /> },
        
      //   //meetingrooms
      //   { path: 'meeting-rooms', element: <MeetingRooms /> },
      //   { path: 'booking-meeting-rooms', element: <BookingMeetingRooms /> },
      //   // Payment
      //   { path: 'payment', element: <Payment /> },
      //   { path: 'receipt', element: <Receipt /> },
      //   { path: 'paymentmethod', element: <PaymentMethod /> },
      //   { path: 'payment_history', element: <PaymentHistory /> },

      //   { path: '*', element: <h2>404 - Not Found</h2> }, // เส้นทาง 404 สำหรับเส้นทางที่ไม่พบ
      // ],
    },
  ]);

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default RouterComponent;
