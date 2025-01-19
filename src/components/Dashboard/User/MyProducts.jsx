import { useQuery } from "@tanstack/react-query";


import { Helmet } from "react-helmet-async";
import MyProductRow from "./MyProductRow";

import UseAxiosSecure from './../../../hooks/useAxiosSecure';

import LoadingSpinner from './../../LoadingSpinner';
import useAuth from "../../../hooks/useAuth";


const MyProducts = () => {
    const { user } = useAuth()
    const axiosSecure = UseAxiosSecure()
    const {
      data: products = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['products', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure(`/products/${user?.email}`)
  
        return data
      },
    })

    if (isLoading) return <LoadingSpinner />
    return (
        <>
     <Helmet>
        <title> TechDiscoverly | Dashboard | My Products</title>
      </Helmet>
      <div className="container mx-auto px-4  ">
  <h2 className="text-xl md:text-3xl  text-[#8D0B41] font-bold pt-6 flex items-center gap-2">
    My Products : {products.length}
  </h2>
  <div className='my-6 overflow-x-auto shadow rounded-lg '>
              
              <table className='table table-xs table-pin-rows table-pin-cols'>
                <thead>
                 
                <tr >
            <th
             
              className="px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Product Name
            </th>
            <th
             
              className="px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Number of Votes
            </th>
            <th
             
              className="px-4 sm:px-5 py-3 bg-gray-50 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Status
            </th>
            <th
             
              className="px-4 sm:px-5 py-3 border-b bg-gray-50 border-gray-200 text-gray-800 text-center  text-sm uppercase font-normal"
            >
             Action
            </th>
           
          </tr>
        </thead>
        <tbody>
          {products.map((productData) => (
            <MyProductRow
              key={productData._id}
              refetch={refetch}
              productData={productData}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>


    </>
    );
};

export default MyProducts;