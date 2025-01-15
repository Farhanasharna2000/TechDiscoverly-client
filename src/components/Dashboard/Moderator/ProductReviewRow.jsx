/* eslint-disable react/prop-types */


const ProductReviewRow = ({ productReviewData, refetch }) => {
    console.log(productReviewData);
    const { productName} =
    productReviewData || ""
    return (
        <tr className="bg-gray-50">
     
    
        <td className='px-5 py-5 border-b border-gray-200  text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{productName}</p>
        </td>

        
        <td className='px-5 py-5 border-b border-gray-200  text-sm'>
      
          <button
           className="btn  font-extrabold bg-[#D39D55] hover:bg-[#8D0B41] text-white  hover:scale-105 transition-transform "
           >View Details
          </button>
  
         
          </td>
      
        <td className='px-5 py-5 border-b border-gray-200  text-sm'>
      
          <button
           className="btn  font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white  hover:scale-105 transition-transform "
           > Featured 
          </button>
  
         
          </td>
          
        
        <td className='px-5 py-5 border-b border-gray-200  text-sm'>
      
          <button
           
           className="btn hover:text-[#1cb943] bg-[#1cb943] text-white">Accept
          </button>
  
         
          </td>
        <td className='px-5 py-5 border-b border-gray-200  text-sm'>
          <button
           
           className="btn hover:text-[#B91C1C] bg-[#B91C1C] text-white ">Reject 
          </button>
    
         
          </td>
        </tr>
    );
};

export default ProductReviewRow;