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
      <div className="container mx-auto px-4  md:px-8">
  <h2 className="text-xl sm:text-2xl text-[#8D0B41] py-4 sm:py-8 text-center sm:text-start font-bold">
    My Products : {products.length}
  </h2>
  <div className="overflow-x-auto">
    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-50">
            <th
              scope="col"
              className="px-4 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Product Name
            </th>
            <th
              scope="col"
              className="px-4 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Number of Votes
            </th>
            <th
              scope="col"
              className="px-4 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-4 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Update
            </th>
            <th
              scope="col"
              className="px-4 sm:px-5 py-3 border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
            >
              Delete
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
</div>

    </>
    );
};

export default MyProducts;