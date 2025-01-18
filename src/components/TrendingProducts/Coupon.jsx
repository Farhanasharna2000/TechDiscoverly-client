import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import {format} from 'date-fns'
import useRole from "../../hooks/useRole";
import toast from "react-hot-toast";
import { useState } from "react";
const Coupon = () => {
    const axiosPublic = useAxiosPublic()
    const [role]=useRole()
    const [isCopied, setIsCopied] = useState(false);
  
    const {
      data: coupons = [],
      isLoading,
    
    } = useQuery({
      queryKey: ['coupons'],
      queryFn: async () => {
        const { data } = await axiosPublic('/coupons')
        return data
      },
    })

const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
  
  };
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      toast.success("Coupon Code Copied!"); 
      setTimeout(() => setIsCopied(false), 2000); 
    }).catch((err) => console.error("Failed to copy text:", err));
  };
    if (isLoading) return <LoadingSpinner />

    return (
      <div className=" mx-4 md:mx-0">
{coupons.length > 0 ? (
    <Slider {...settings} className="pb-8 md:w-1/2  mx-auto">
            
            
   {
    coupons.map(coupon=>(
      <div  key={coupon._id}  className=" bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-[#8D0B41] text-center mb-4">🎉 Coupon Code 🎉</h2>
      <div className="bg-gray-100 p-4 rounded-md mb-4 text-center">
        <p onClick={() => handleCopy(coupon.code)}>
        <span className="font-bold text-[#8D0B41]">Code: </span>
        <span 
          className="text-gray-700 cursor-pointer hover:underline hover:text-[#8D0B41]"  
        >
           {coupon.code}
        </span>
        </p>
     
      </div>
      <div className="mb-4 space-y-2 text-center">
   
       <p className="text-gray-600 text-sm italic">{coupon.description}</p>

        <p className="font-bold md:text-4xl text-[#8D0B41]">
          {coupon.discount}% off
        </p>
        <p className="text-gray-700">
                <span className="font-bold text-[#8D0B41]">Valid Until*</span>{" "}
                {format(new Date(coupon.expiry), "MMMM dd, yyyy h:mm a")}
              </p>
      </div>
     {
      role==='User'?(
        <Link 
    
     to={'/dashboard/my-profile'} 
     
     className="flex justify-center items-center">
     <button className="w-full md:w-auto  px-4 py-2 text-white bg-[#8D0B41] rounded hover:bg-[#D39D55] transition">
        Use Coupon
      </button>
     </Link>
      ):""
     }
    </div>
    )

    )
   }
 
        </Slider>
         )
         : (
          <div className="bg-gray-100 p-4 md:w-1/4 mx-auto mb-8">

            <p className="text-center ">No coupons available.</p>
          </div>
        )}
      </div>
      
    );
};

export default Coupon;