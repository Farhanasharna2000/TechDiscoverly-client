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
    console.log(products)
    if (isLoading) return <LoadingSpinner />
    return (
        <>
      <Helmet>
        <title>My Products</title>
      </Helmet>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                  
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                    Product Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     Number of Votes
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>
                   
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Update
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                {products.map(productData => (
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
        </div>
      </div>
    </>
    );
};

export default MyProducts;