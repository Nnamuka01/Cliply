import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from './pages/LoginPage/Login';
import DashboardPage from './pages/DashboardPage/Dashboard';
import RegisterPage from './pages/RegisterPage/Register';
// import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
// import UpdatePassword from './pages/UpdatePassword/UpdatePassword';
import NotFound from './pages/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard/:email",
    element: <DashboardPage />,
  
  },
  // {
  //   path: "/forgot-password",
  //   element: <ForgotPassword />,
  // },
  // {
  //   path: "/update-password",
  //   element: <UpdatePassword />
  // },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
