import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ProductReviewRow = ({ productReviewData,refetch }) => {
    const { productName, status, _id, isAccepted, isRejected, isFeatured } = productReviewData || {};
    
    const axiosSecure = useAxiosSecure();
    const [updateStatus, setUpdateStatus] = useState(status);
    const [buttonStates, setButtonStates] = useState({
        isAccepted: isAccepted || false,
        isRejected: isRejected || false,
        isFeatured: isFeatured || false
    });
    const [error, setError] = useState(null);
    const handleStatusUpdate = async (newStatus) => { 
      try {
          let payload = { id: _id }; 
      
          if (newStatus === 'rejected') {
              payload.isRejected = true;
              payload.isAccepted = false; 
              payload.status = 'rejected'; 
          } else if (newStatus === 'accepted') {
              payload.isAccepted = true;
              payload.isRejected = false; 
              payload.status = 'accepted'; 
          } else if (newStatus === 'featured') {
              
              payload.isFeatured = true;
          }
      
          const response = await axiosSecure.post('/updateProductStatus', payload);
      
          if (response.status === 200) {
              
              if (newStatus === 'featured') {
                  setUpdateStatus(status); 
              } else {
                  setUpdateStatus(newStatus); 
              }
  
              setButtonStates(prev => ({
                  ...prev,
                  isAccepted: newStatus === 'accepted' ? true : prev.isAccepted,
                  isRejected: newStatus === 'rejected' ? true : prev.isRejected,
                  isFeatured: newStatus === 'featured' ? true : prev.isFeatured
              }));
  
              refetch(); 
          }
      } catch (err) {
          setError('Failed to update status. Please try again.');
          console.error('Failed to update status', err);
      }
  };
  

    return (
        <tr className="bg-gray-50">
            <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{productName}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{updateStatus}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 md:flex gap-3 text-sm">
                <button
                    className="btn btn-sm font-extrabold bg-[#D39D55] hover:bg-[#8D0B41] text-white hover:scale-105 transition-transform"
                >
                    View Details
                </button>
                <button
                    onClick={() => handleStatusUpdate('featured')}
                    className={`btn btn-sm font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white hover:scale-105 transition-transform`}
                >
                    {buttonStates.isFeatured ? 'Featured' : 'Feature'}
                </button>
                {/* Accept Button */}
                <button
                    onClick={buttonStates.isRejected === false && buttonStates.isAccepted === false ? () => handleStatusUpdate('accepted') : undefined}
                    disabled={buttonStates.isRejected || buttonStates.isAccepted}
                    className={`btn btn-sm hover:text-[#1cb943] bg-[#1cb943] text-white`}
                >
                    {buttonStates.isAccepted ? 'Accepted' : 'Accept'}
                </button>
                {/* Reject Button */}
                <button
                    onClick={buttonStates.isRejected === false ? () => handleStatusUpdate('rejected') : undefined}
                    disabled={buttonStates.isAccepted || buttonStates.isRejected}
                    className="btn btn-sm hover:text-[#B91C1C] bg-[#B91C1C] text-white"
                >
                    {buttonStates.isRejected ? 'Rejected' : 'Reject'}
                </button>
            </td>
            {error && (
                <td className="px-5 py-5 text-sm text-red-500">
                    {error}
                </td>
            )}
        </tr>
    );
};

export default ProductReviewRow;
