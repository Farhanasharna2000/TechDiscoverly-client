import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner";
import ProductReviewRow from "./ProductReviewRow";
import { FaStreetView } from "react-icons/fa";
import { Helmet } from "react-helmet-async";



const ProductReviewQueue = () => {
    
    const axiosSecure = UseAxiosSecure()
    const {
      data: reviewProducts = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['reviewProducts'],
      queryFn: async () => {
        const { data } = await axiosSecure('/products')
  
        return data
      },
    })
    console.log(reviewProducts)
    if (isLoading) return <LoadingSpinner />
    return (
      <div className="container mx-auto px-4 ">
          <Helmet>
        <title> TechDiscoverly | Dashboard | Product Review Queue</title>
      </Helmet>
         <h2 className="text-xl md:text-3xl  text-[#8D0B41] font-bold pt-6 flex items-center gap-2"><span><FaStreetView/></span> Total Products : {reviewProducts.length}</h2>
    <div className='my-6 overflow-x-auto shadow rounded-lg '>
              
              <table className='table table-xs table-pin-rows table-pin-cols'>
                <thead>
                 
                <tr className="text-center ">
                  <th
                  
                    className="px-5 py-3 border-b bg-gray-50 border-gray-200 text-gray-800 text-sm uppercase font-normal"
                  >
                    Product Name
                  </th>
                  <th
                  
                    className="px-5 py-3 border-b bg-gray-50 border-gray-200 text-gray-800 text-sm uppercase font-normal"
                  >
                    Status
                  </th>
                  <th
                  
                    className="px-5 py-3 border-b bg-gray-50 border-gray-200 text-gray-800 text-sm uppercase font-normal"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {reviewProducts.map((productReviewData) => (
                  <ProductReviewRow
                    key={productReviewData._id}
                    refetch={refetch}
                    productReviewData={productReviewData}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
   
    
    );
};

export default ProductReviewQueue;