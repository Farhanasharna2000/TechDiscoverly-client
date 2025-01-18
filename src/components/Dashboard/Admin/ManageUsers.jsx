import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import UseAxiosSecure from "../../../hooks/useAxiosSecure"
import LoadingSpinner from "../../LoadingSpinner"
import { Helmet } from "react-helmet-async"
import ManageUserRow from "./ManageUserRow"
import { FaUsers } from 'react-icons/fa';


const ManageUsers = () => {
    const { user } = useAuth()
    const axiosSecure = UseAxiosSecure()
    const {
      data: users = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['users',user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure(`/all-users/${user?.email}`)
        return data
      },
    })

  
    if (isLoading) return <LoadingSpinner />
    return (
      <>
        <div className='container mx-auto px-4 '>
        <Helmet>
        <title> TechDiscoverly | Dashboard | Manage Users</title>
      </Helmet>
          <h2 className="text-xl md:text-3xl  text-[#8D0B41] font-bold pt-6 flex items-center gap-2"><span><FaUsers/></span> Total Users : {users.length}</h2>
              <div className='my-6 overflow-x-auto shadow rounded-lg '>
              
                <table className='table table-xs table-pin-rows table-pin-cols'>
                  <thead>
                    <tr >
                    <th
                     
                        className='px-5 py-3 bg-gray-50  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Name
                      </th>
                      <th
                       
                        className='px-5 py-3 bg-gray-50  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Email
                      </th>
                     
                      <th
                       
                        className='px-5 py-3 bg-gray-50  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                       Role
                      </th>
  
                      <th
                       
                        className='px-5 py-3 bg-gray-50 text-center  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal'
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {users.map(userData => (
                      <ManageUserRow
                        refetch={refetch}
                        key={userData?._id}
                        userData={userData}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        
      </>
    )
  }

export default ManageUsers;