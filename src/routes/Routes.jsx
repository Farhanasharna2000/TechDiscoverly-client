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
import ProductReviewQueue from "../components/Dashboard/Moderator/ProductReviewQueue";
import ReportedContents from "../components/Dashboard/Moderator/ReportedContents";

import ManageUsers from "../components/Dashboard/Admin/ManageUsers";

import PrivateRoute from "./PrivateRoute";
import ModeratorRoute from "./ModeratorRoute";
import AdminRoute from "./AdminRoute";
import Statistics from "../components/Dashboard/Admin/Statistics ";
import ManageCoupons from "../components/Dashboard/Admin/ManageCoupons";
import ProductDetails from "../components/ProductDetails/ProductDetails";


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
        path: '/productDetails/:id',
        element: <PrivateRoute>
          <ProductDetails />
        </PrivateRoute>,
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
        element: <PrivateRoute>
          <MyProfile/>
        </PrivateRoute>
      },
      {
        path: 'add-product',
        element: <PrivateRoute>
          <AddProducts/>
        </PrivateRoute>
      },
      {
        path: 'my-products',
        element: <PrivateRoute>
          <MyProducts/>
        </PrivateRoute>
      },
      {
        path: 'updateProduct/:id',
        element: <PrivateRoute>
          <UpdateProduct/>
        </PrivateRoute>
      },
      
      //modetrator routes
      {
        path: 'product-review-queue',
        element: <PrivateRoute>
          <ModeratorRoute>
          <ProductReviewQueue/>
          </ModeratorRoute>
        </PrivateRoute>
      },
      {
        path: 'reported-contents',
        element:<PrivateRoute>
        <ModeratorRoute>
        <ReportedContents/>
        </ModeratorRoute>
      </PrivateRoute> 
      },
      //admin routes
      {
        path: 'statistics',
        element:<PrivateRoute>
        <AdminRoute>
        <Statistics/>
        </AdminRoute>
      </PrivateRoute>  
      },
    
      {
        path: 'manage-users',
        element:<PrivateRoute>
        <AdminRoute>
        <ManageUsers/>
        </AdminRoute>
      </PrivateRoute>  
      },
      {
        path: 'manage-coupons',
        element:<PrivateRoute>
        <AdminRoute>
        <ManageCoupons/>
        </AdminRoute>
      </PrivateRoute>  
      },
    
    ]
  }
]);
  

