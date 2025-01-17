/* eslint-disable react/prop-types */

import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";


const MyProductRow = ({ productData, refetch }) => {
    console.log(productData);
    
    const axiosSecure=UseAxiosSecure()
 
    const { productName, upvoteCount, _id, status } =
    productData
       // handle product delete
       const handleDelete=id=>{
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
                axiosSecure.delete(`/products/${id}`)
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
          <p className='text-gray-900 whitespace-no-wrap'>{productName}</p>
        </td>
        <td className='px-5 py-5 border-b  border-gray-200  text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{upvoteCount}</p>
        </td>
        
      
        <td className='px-5 py-5 border-b border-gray-200  text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{status}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 text-center   text-sm'>
        <Link to={`/dashboard/updateProduct/${_id}`}>
          <button
           
           className="btn btn-ghost btn-lg text-[#1cb943]"><FaEdit/>
          </button>
    </Link>
    <button
           onClick={() => handleDelete(_id)}
           className="btn btn-ghost btn-lg text-[#B91C1C]"><RiDeleteBinLine />
          </button>
          </td>
       
        </tr>
    );
};

export default MyProductRow;