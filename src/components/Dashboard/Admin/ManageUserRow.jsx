/* eslint-disable react/prop-types */
import { useState } from "react";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import UpdateUserModal from "./UpdateUserModal";
import toast from "react-hot-toast";


const ManageUserRow = ({userData,refetch}) => {
  
    
    const [isOpen, setIsOpen] = useState(false)
    const axiosSecure = UseAxiosSecure()
    const { email, role, name } = userData || {}
 
   const updateRole = async selectedRole => {
    
    
    if (role === selectedRole) return
    try {
      await axiosSecure.patch(`/user/role/${email}`, {
        role: selectedRole,
      })
      toast.success('Role updated successfully!')
      refetch()
    } catch (err) {
      toast.error(err?.response?.data)
      
    } finally {
      setIsOpen(false)
    }
  }
    return (
        <tr className="bg-gray-50">
        <td className='px-5 py-5 border-b border-gray-200  text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{name}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200  text-sm'>
          <p className='text-gray-900 whitespace-no-wrap'>{email}</p>
        </td>
        <td className={`px-5 py-5 border-b font-bold border-gray-200 text-sm ${
  role === 'User' ? 'text-red-500' : 
  role === 'Moderator' ? 'text-green-500' : ''
}`}>
  {role}
</td>

  
        <td className='px-5 py-5 border-b border-gray-200 text-center text-sm'>
          <span
            onClick={() => setIsOpen(true)}
            className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
          >
           <button className="btn text-xs btn-sm font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white  hover:scale-105 transition-transform w-full">Update Role</button>
          </span>
          {/* Modal */}
          <UpdateUserModal updateRole={updateRole} role={role} isOpen={isOpen} setIsOpen={setIsOpen} />
        </td>
      </tr>
    );
};

export default ManageUserRow;