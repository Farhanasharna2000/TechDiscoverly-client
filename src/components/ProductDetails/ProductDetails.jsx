import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from './../../hooks/useAuth';
import { useState } from "react";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import StarRatingComponent from "react-star-rating-component";
import toast from "react-hot-toast";

import { HiOutlineExternalLink } from "react-icons/hi";


const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate()


  const [description, setDescription] = useState("")


  const axiosSecure = UseAxiosSecure()
  
  //rating
  const [rating, setRating] = useState(0);
  const onStarClick = (nextValue) => {
    setRating(nextValue);
  };
  const {
    data: product = {},
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/product/${id}`
      )
      return data
    },
  })
  console.log(product);

  const handleReport = () => {

  };
  const handleReviewSubmit =async (e) => {
    e.preventDefault();
    const reviewData = {
      reviewerName: user?.displayName,
      reviewerImage: user?.photoURL,
      description,
      rating,
      productId:product._id
    }
    // console.log(reviewData);
     
   // save review in db
   try {
    
    await axiosSecure.post('/review',reviewData)
    toast.success('Review Added Successfully!')
  
  } catch (err) {
    console.log(err)
  } 
  };
  const handleUpvote = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await axiosSecure.post(`/upvote/${productId}`, {
        email: user?.email,
      });

      if (response.status === 200) {
        toast.success('Vote successful');
        refetch()

      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="container md:pt-24 mx-auto">
      <div className="flex gap-10">
 {/* Product Details Section */}
 <div className="bg-white shadow-md rounded-lg p-6 mb-6 ">
        <img src={product.productImage} alt={product.productName} className="w-full h-96 object-cover rounded-md" />
        <div className="flex-grow">
        <h2 className="text-2xl font-bold mt-4">{product.productName}</h2>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {product.tags.map((tag) => (
            <span key={tag} className="bg-[#D6CFB4]/40 text-gray-700 text-sm font-medium px-2 py-1 rounded-md">#{tag}</span>
          ))}
        </div>
        </div>
        <div className="flex justify-end items-center gap-4 mt-4">
        <button
    onClick={() => handleUpvote(product._id)}
    className={`w-auto flex justify-center items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${product.ownerEmail === user?.email ? 'cursor-not-allowed opacity-50' : ''}`}
    disabled={product.ownerEmail === user?.email}
  >
    <img
      className="w-8"
      src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000"
      alt="Upvote Icon"
    />
    <span>{product.upvoteCount}</span>
  </button>
  <Link to={product.link}>
    <button
      type="submit"
      className="px-4 py-2 w-full flex items-center gap-2 rounded md:w-auto bg-[#8D0B41] hover:bg-[#D39D55] text-white"
    >
    <span> <HiOutlineExternalLink /> </span> View Link
    </button>
  </Link>



  <button
    onClick={handleReport}
    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  >
    Report
  </button>
</div>

      </div>
       {/* Post Review Section */}
       <div className="bg-white shadow-md rounded-lg p-6 md:w-1/2 mx-auto justify-center  md:h-1/4  mb-8">
        <h3 className="md:text-4xl text-[#8D0B41] text-center font-bold mb-4">Post a Review</h3>
       <div className="flex flex-col">
       <form onSubmit={handleReviewSubmit} className="space-y-4">
          
          <div>
      
            <img className="w-20  h-20 rounded-full " src={user?.photoURL} alt="" />
            {/* <input placeholder={user?.displayName}  readOnly className="input mt-3  input-secondary input-bordered w-full max-w-xs" /> */}
            <p className="block text-[#8D0B41] md:text-2xl font-bold mb-2 ">*{user?.displayName}*</p>
          </div>
          <div>
            <label className="block   font-bold mb-2 ">Review </label>
            <textarea value={description}
            placeholder="Type here"
              onChange={(e) => setDescription(e.target.value)} className="w-full  px-3 py-2 border rounded" required />
          </div>
          <div className="flex items-center">
            <label className="block font-bold mb-4 text-[#8D0B41]">Rating </label>

            <div className="md:text-2xl mb-4">
              <StarRatingComponent
                name="rating"
                value={rating}
                starCount={5}
                onStarClick={onStarClick}
                starColor="#FFD700"
                emptyStarColor="#E4E4E7"
              />
            </div>
          </div>
         
        </form>
        <button
        onClick={handleReviewSubmit}
            type="submit"
           className="px-4 py-2 w-full mx-auto  rounded md:w-56 bg-[#8D0B41] hover:bg-[#D39D55] text-white"
          >
            Submit
          </button>
       </div>
       
      </div>
      </div>
     

      {/* Reviews Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        {/* {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border p-4 rounded-md">
                <div className="flex items-center gap-2">
                  <img src={review.reviewerImage} alt={review.reviewerName} className="w-10 h-10 rounded-full" />
                  <span className="font-medium">{review.reviewerName}</span>
                </div>
                <p className="mt-2">{review.description}</p>
                <p className="mt-1 text-yellow-500">Rating: {review.rating}/5</p>
              </div>
            ))}
          </div>
        )} */}
      </div>

     
    </div>
  );
};

export default ProductDetails;