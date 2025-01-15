import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../LoadingSpinner";
import ProductReviewRow from "./ProductReviewRow";



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
        <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='bg-gray-50 inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                  
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                   Product Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                   View Details
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Featured 
                    </th>
                   
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                    Accept
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                     Reject 
                    </th>
                  </tr>
                </thead>
                <tbody>
                {reviewProducts.map(productReviewData => (
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
        </div>
      </div>
    );
};

export default ProductReviewQueue;