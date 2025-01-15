
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MyProductRow = ({ productData, refetch }) => {
    console.log(productData);
    
    const axiosSecure=UseAxiosSecure()
 
    const { productName, upvoteCount, _id, status } =
    productData
       // handle order delete/cancellation
    const handleDelete = async () => {
      try {
        //fetch delete request
        await axiosSecure.delete(`/products/${_id}`)
       
        // call refetch to refresh ui(fetch products data again)
        refetch()
        toast.success('Order Cancelled.')
      } catch (err) {
        console.log(err)
        toast.error(err.response.data)
      } 
    }
    return (
        <tr>
     
    
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{productName}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{upvoteCount}</p>
        </td>
        
      
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{status}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <button
           
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
          >
            <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
            <span className='relative cursor-pointer'>Update</span>
          </button>
    
         
          </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <button
           onClick={handleDelete}
            className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
          >
            <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
            <span className='relative cursor-pointer'>Delete</span>
          </button>
    
         
          </td>
        </tr>
    );
};

export default MyProductRow;