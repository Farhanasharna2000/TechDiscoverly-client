import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import UseAxiosSecure from "../../../hooks/useAxiosSecure"
import LoadingSpinner from "../../LoadingSpinner"
import { Helmet } from "react-helmet-async"
import ManageUserRow from "./ManageUserRow"


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
  console.log(users);
  
    if (isLoading) return <LoadingSpinner />
    return (
      <>
        <div className='container mx-auto px-4 sm:px-8'>
          <Helmet>
            <title>Manage Users</title>
          </Helmet>
          <div className='py-8'>
            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='bg-gray-50 inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className=' min-w-full leading-normal'>
                  <thead>
                    <tr>
                    <th
                        scope='col'
                        className='px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Name
                      </th>
                      <th
                        scope='col'
                        className='px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                        Email
                      </th>
                     
                      <th
                        scope='col'
                        className='px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                      >
                       Role
                      </th>
  
                      <th
                        scope='col'
                        className='px-5 py-3   border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
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
          </div>
        </div>
      </>
    )
  }

export default ManageUsers;