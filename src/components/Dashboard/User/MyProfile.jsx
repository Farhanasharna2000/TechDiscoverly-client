
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
    const axiosSecure = UseAxiosSecure();
    const { user } = useAuth();
    const { data: userData = [] } = useQuery({
      queryKey: ['users', user?.email],
      queryFn: async () => {
        if (!user?.email) return;
        const res = await axiosSecure.get(`/users/${user.email}`);
       
        return res.data;
      },
    });
    console.log(userData);
    
    return (
        <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center space-x-6">
        {/* User Image */}
        <img
          src={userData.photo}
          alt="User Profile"
          className="w-32 h-32 rounded-full object-cover"
        />

        {/* User Info */}
        <div>
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <p className="text-lg text-gray-500">{userData.email}</p>
        </div>
      </div>

        {/* Membership Info */}
        <div className="mt-8">
        {userData.isSubscribed==='false' ? (
          <button
         
            className='px-4 py-3 hover:bg-[#D39D55] bg-[#8D0B41] text-white  transition font-semibold'
          >
            $500 Subscribe Now
          </button>
        ) : (
         
            <p className="text-green-800 font-bold">Status: Verified</p>
      
        )}
      </div>

      
    </div>
  );
};
export default MyProfile;