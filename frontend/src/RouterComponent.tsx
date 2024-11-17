import React, { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignInPages from './authentication/Login';
import LayoutFoodService from './food_service/page/layout/LayoutFoodService';
import CheckOut from './payment/page/checkout/CheckOut';
import SignUpPages from './authentication/Register';
import { CgProfile } from 'react-icons/cg';
import { TiShoppingCart } from 'react-icons/ti';
import CruiseShipLogo from './assets/cruise_ship_logo.jpg'

const RouterComponent: React.FC = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignInPages />, // เส้นทางหลักคือหน้า Login
    },
    {
      path: '/signup',
      element: <SignUpPages />, // เส้นทางหลักคือหน้า Login
    },
    {
      path: '/login/menu',
      element: <LayoutFoodService />,
    },
    {
      path: '/login/checkout',
      element: <CheckOut />,
    },
  ]);

  return (
    <StrictMode>
      <header className="navbar">
        <div>
          <img src={CruiseShipLogo} className="cruise-ship-logo-logo" />
        </div>
        <div className="menu">
          <a href=""> <CgProfile size={35} /> </a>
          <a href="/cart"> <TiShoppingCart size={35} /> </a>
        </div>
      </header>
      <RouterProvider router={router} />
    </StrictMode>
  );
};

export default RouterComponent;
