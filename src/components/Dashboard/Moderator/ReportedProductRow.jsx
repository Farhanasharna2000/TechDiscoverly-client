/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const ReportedProductRow = ({reportedData,refetch}) => {
    const {productName,productId}=reportedData;
    const axiosSecure=UseAxiosSecure()

    // handle product delete
    const handleDelete=productId=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reports/${productId}`)
                .then(res=>{
                   if(res.data.deletedCount>0){
              refetch()

   Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
                   }
                    
                })
           
            }
          });
    }

    
    return (
           <tr className="bg-gray-50">
              
               <td className='px-5 py-5 border-b border-gray-200  text-sm'>
                 <p className='text-gray-900 text-center whitespace-no-wrap'>{productName}</p>
               </td>
           
         
               <td className='px-5 flex items-center justify-center gap-4 py-5 border-b border-gray-200  text-sm'>
                 <Link to={`/productDetails/${productId}`}>
                 <button className="btn text-xs btn-sm font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white  hover:scale-105 transition-transform w-full md:w-auto">View details</button>
                 </Link>
                 
                <button
                 onClick={() => handleDelete(productId)}
                className="bg-red-500 text-white btn text-xs btn-sm  hover:bg-red-600">Delete</button>
              
               </td>
             </tr>
    );
};

export default ReportedProductRow;