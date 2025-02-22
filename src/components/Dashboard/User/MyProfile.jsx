import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useRef, useState } from "react";
import PaymentModal from "./PaymentModal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useRole from "../../../hooks/useRole";
import { FaEdit } from "react-icons/fa";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const MyProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const [modalState, setModalState] = useState({ payment: false, updateProfile: false });
  const [coupon, setCoupon] = useState("");
  const [payment, setPayment] = useState(500);
  const [role] = useRole();

  // Refs for input fields
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const photoRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const handleCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const applyCoupon = async () => {
    try {
      const response = await axiosSecure.post("/validate-coupon", { couponCode: coupon });
      const { discount } = response.data;
      const newPayment = payment - payment * (discount / 100);
      setPayment(newPayment);
      Swal.fire({
        title: "Coupon Applied!",
        text: `You get ${discount}% off. Total: $${newPayment}`,
        icon: "success",
        confirmButtonText: "OK",
      });
      setCoupon("");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to apply coupon",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      setCoupon("");
    }
  };
  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      if (!user?.email) return;
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const toggleModal = (type, isOpen) => {
    setModalState((prevState) => ({ ...prevState, [type]: isOpen }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name: nameRef.current?.value || userData?.name,
      email: emailRef.current?.value || userData?.email,
      photo: photoRef.current?.value || userData?.photo,
      phone: phoneRef.current?.value || userData?.phone,
      address: addressRef.current?.value || userData?.address,
    };

    try {
      const response = await axiosSecure.put(`/users/${user.email}`, updatedUser);

      if (response.status === 200) {
        Swal.fire({
          title: "Profile Updated!",
          text: "Your profile has been successfully updated.",
          icon: "success",
          confirmButtonText: "OK",
        });

        refetch();
        toggleModal("updateProfile", false);
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update profile",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="min-h-screen flex md:pt-32 pt-28 flex-col items-center mx-auto px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>TechDiscoverly | Dashboard | My Profile</title>
      </Helmet>

      <div className="flex flex-col m-4 md:m-0 justify-center items-center">
        <img
          src={userData?.photo || "/default-avatar.png"}
          alt="User Profile"
          className="md:w-28 w-10 h-10 md:h-28 rounded-full"
        />
        <div className="text-center space-y-1">
          <p className="md:text-2xl text-[#8D0B41] font-bold badge badge-secondary p-2 md:p-4 uppercase bg-white">
            {role}
          </p>
          </div>
        <div className="text-center mt-4">
          <h1 className="text-lg md:text-2xl font-bold uppercase">{userData?.name}</h1>
          <p className="text-sm md:text-lg text-gray-700">{userData?.email}</p>
          <p className="text-sm md:text-lg text-gray-700">{userData?.phone || 'Number:'}</p>
          <p className="text-sm md:text-lg text-gray-700">{userData?.address || "Address:"}</p>
        </div>
        {role === "User" && (
          <div className="mt-8">
            {!userData?.isSubscribed ? (
              <div>
                <div className="flex flex-col sm:flex-row items-center sm:space-x-2 space-y-2 sm:space-y-0 mb-4">
                  <input
                    type="text"
                    value={coupon}
                    onChange={handleCouponChange}
                    placeholder="Enter coupon code"
                    className="border p-2 rounded flex-grow text-[#8D0B41]"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-6 py-3 bg-[#8D0B41] text-white hover:bg-[#D39D55] font-semibold text-center rounded"
                  >
                    Apply Coupon
                  </button>
                  <button
                    onClick={() => toggleModal("payment", true)}
                    className="px-6 py-3 bg-[#8D0B41] text-white hover:bg-[#D39D55] font-semibold text-center rounded"
                  >
                    ${payment} Subscribe Now
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-green-800 font-bold text-center sm:text-left">Status: Verified</p>
            )}
          </div>
        )}


        <div className="mt-6">
          <button
            onClick={() => toggleModal("updateProfile", true)}
            className="px-4 py-2 flex items-center gap-2 bg-green-800 text-white hover:bg-[#D39D55] font-semibold text-center rounded w-full"
          >
            <FaEdit /> Update Profile
          </button>
        </div>
      </div>

      {modalState.updateProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg md:text-xl font-bold mb-4 text-[#8D0B41]">Update Profile</h2>
            <form onSubmit={handleUpdateProfile}>
              <input type="text" defaultValue={userData?.name} ref={nameRef} placeholder="Name" className="border p-2 w-full rounded mb-2" />
              <input type="email" defaultValue={userData?.email} ref={emailRef} placeholder="Email" className="border p-2 w-full rounded mb-2" disabled />
              <input type="text" defaultValue={userData?.photo} ref={photoRef} placeholder="Profile Image URL" className="border p-2 w-full rounded mb-2" />
              <input type="text" defaultValue={userData?.phone} ref={phoneRef} placeholder="Phone Number" className="border p-2 w-full rounded mb-2" />
              <input type="text" defaultValue={userData?.address} ref={addressRef} placeholder="Address" className="border p-2 w-full rounded mb-4" />
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => toggleModal("updateProfile", false)} className="px-4 py-2 bg-red-500 text-white rounded w-full">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded w-full">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
        {modalState.payment && (
        <Elements stripe={stripePromise}>
          <PaymentModal closeModal={() => toggleModal("payment", false)} isOpen={modalState.payment} refetch={refetch} userData={userData} payment={payment} />
        </Elements>
      )}
    </div>
  );
};

export default MyProfile;
