import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Products from "../pages/Products/Products";
import SignUp from './../pages/SignUp/SignUp';
import Dashboard from "../components/Dashboard/Dashboard";
import AddProducts from './../components/Dashboard/User/AddProducts';
import MyProducts from './../components/Dashboard/User/MyProducts';
import UpdateProduct from "../components/Dashboard/User/UpdateProduct";
import MyProfile from "../components/Dashboard/User/MyProfile";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
         path: '/login', 
         element: <Login /> 
        },
      { 
        path: '/signup', 
        element: <SignUp /> 
      },
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard/>,
    children: [
      // user routes
      {
        path: 'my-profile',
        element: <MyProfile/>
      },
      {
        path: 'add-product',
        element: <AddProducts/>
      },
      {
        path: 'my-products',
        element: <MyProducts/>
      },
      {
        path: 'updateProduct/:id',
        element: <UpdateProduct/>
      },
      
      
      
    ]
  }
]);
  

