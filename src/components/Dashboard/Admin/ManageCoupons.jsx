/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdAddCard } from "react-icons/md";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet-async";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [expiryDate, setExpiryDate] = useState(null); 
  const [couponDescription, setCouponDescription] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const axiosSecure = UseAxiosSecure();

  const isFormValid = () => {
    return (
      couponCode.trim() !== "" &&
      expiryDate !== null &&
      couponDescription.trim() !== "" &&
      discountAmount.trim() !== ""
    );
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const response = await axiosSecure.get("/coupons");
    setCoupons(response.data);
  };

  const addCoupon = async () => {
    if (!isFormValid()) {
      Swal.fire({
        title: "Error!",
        text: "Please fill out all fields before adding the coupon.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const newCoupon = {
      code: couponCode,
      expiry: new Date(expiryDate).toISOString(), // Convert expiry to ISO string
      description: couponDescription,
      discount: discountAmount,
    };

    const response = await axiosSecure.post("/coupons", newCoupon);
   

    if (response.status === 200) {
      fetchCoupons();
      closeModal();
      Swal.fire({
        title: "Success!",
        text: "Coupon added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      console.log("Failed to add coupon.");
    }
  };

  const editCoupon = async () => {
    const updatedCoupon = {
      code: couponCode,
      expiry: new Date(expiryDate).toISOString(),
      description: couponDescription,
      discount: discountAmount,
    };

    const response = await axiosSecure.put(`/coupons/${editingCoupon._id}`, updatedCoupon);
  

    if (response.status === 200) {
      fetchCoupons();
      closeModal();
      Swal.fire({
        title: "Success!",
        text: "Coupon updated successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const deleteCoupon = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosSecure.delete(`/coupons/${id}`);
        if (response.status === 200) {
          fetchCoupons();
          Swal.fire({
            title: "Deleted!",
            text: "Coupon deleted successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      }
    });
  };

  const openModal = (coupon = null) => {
    if (coupon) {
      setCouponCode(coupon.code);
      setExpiryDate(coupon.expiry);
      setCouponDescription(coupon.description);
      setDiscountAmount(coupon.discount);
      setEditingCoupon(coupon);
    } else {
      clearForm();
      setEditingCoupon(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    clearForm();
  };

  const clearForm = () => {
    setCouponCode("");
    setExpiryDate(null); 
    setCouponDescription("");
    setDiscountAmount("");
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
        <Helmet>
        <title> TechDiscoverly | Dashboard | Manage Coupons</title>
      </Helmet>
      <button
        onClick={() => openModal()}
        className="btn flex items-center gap-2 font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white hover:scale-105 transition-transform"
      >
        <span className="md:text-xl"><MdAddCard /></span> Add Coupon
      </button>

      <SectionTitle heading={"All Coupons"}></SectionTitle>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="table text-center">
          <thead>
            <tr className="uppercase">
              <th className="border p-2">Coupon Code</th>
              <th className="border p-2">Expiry Date</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Discount Amount</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon) => (
                <tr key={coupon._id} className="text-center">
                  <td className="border p-2">{coupon.code}</td>
                  <td className="border p-2">
                    {new Date(coupon.expiry).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{coupon.description}</td>
                  <td className="border p-2">{coupon.discount}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => openModal(coupon)}
                      className="btn btn-ghost btn-lg text-[#1cb943]"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteCoupon(coupon._id)}
                      className="btn btn-ghost btn-lg text-[#B91C1C]"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border p-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              {editingCoupon ? "Edit Coupon" : "Add Coupon"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="text"
                placeholder="Coupon Description"
                value={couponDescription}
                onChange={(e) => {
                  const limit = e.target.value.replace(/\s/g, "");
                  if (limit.length > 15) {
                    Swal.fire({
                      title: "Error!",
                      text: "Cannot write more than 15 characters",
                      icon: "error",
                      confirmButtonText: "OK",
                    });
                  } else {
                    setCouponDescription(e.target.value);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="number"
                placeholder="Discount Amount"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <DatePicker
                selected={expiryDate}
                onChange={(date) => setExpiryDate(date)}
                minDate={new Date()}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select Expiry Date"
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              <div className="flex gap-4 justify-end">
                <button
                  onClick={editingCoupon ? editCoupon : addCoupon}
                  className="btn hover:text-green-600 font-bold hover:bg-gray-300 bg-green-600 text-white"
                >
                  {editingCoupon ? "Update Coupon" : "Add Coupon"}
                </button>
                <button
                  onClick={closeModal}
                  className="btn hover:text-red-600 font-bold hover:bg-gray-300 bg-red-600 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
