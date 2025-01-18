
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import PaymentModal from './PaymentModal';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
import Swal from 'sweetalert2'; 
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState('');  
  const [payment, setPayment] = useState(500); 

  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = async () => {
    try {
      const response = await axiosSecure.post('/validate-coupon', { couponCode: coupon });

      // If the coupon is valid, apply the discount
      const { discount } = response.data;
      const newPayment = payment - (payment * (discount / 100));
      setPayment(newPayment);  
    
      Swal.fire({
        title: 'Coupon Applied!',
        text: `You get ${discount}% off. Total: $${newPayment}`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
     
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to apply coupon',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

  const { data: userData = [], refetch } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      if (!user?.email) return;
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
       <Helmet>
        <title> TechDiscoverly | Dashboard | My Profile</title>
      </Helmet>
      {/* User Info Section */}
      <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
        <img
          src={userData.photo}
          alt="User Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <p className="text-lg text-gray-500">{userData.email}</p>
        </div>
      </div>

      {/* Actions Section */}
      <div className="mt-8 ">
        {userData.isSubscribed === false ? (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={coupon}
                onChange={handleCouponChange}
                placeholder="Enter coupon code"
                className="border p-2 rounded"
              />
              <button
                onClick={applyCoupon}
                className="px-4 py-2 bg-[#8D0B41] text-white rounded"
              >
                Apply Coupon
              </button>
            </div>
            <p className="text-lg"></p>
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-3 hover:bg-[#D39D55] bg-[#8D0B41] md:text-base text-xs text-white transition font-semibold rounded-lg w-full sm:w-auto"
            >
             ${payment} Subscribe Now
            </button>
          </div>
        ) : (
          <p className="text-green-800 font-bold text-center sm:text-left">
            Status: Verified
          </p>
        )}
      </div>

      {/* Payment Modal */}
      {isOpen && (
        <Elements stripe={stripePromise}>
          <PaymentModal
            closeModal={closeModal}
            isOpen={isOpen}
            refetch={refetch}
            userData={userData}
            payment={payment}
          />
        </Elements>
      )}
    </div>
  );
};


export default MyProfile;

