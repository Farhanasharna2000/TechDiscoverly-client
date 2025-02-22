import { Link, useNavigate, useParams } from "react-router-dom";
import useAuth from './../../hooks/useAuth';
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import StarRatingComponent from "react-star-rating-component";
import toast from "react-hot-toast";
import { HiOutlineExternalLink } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const axiosPublic = useAxiosPublic ();

  // Rating state
  const [rating, setRating] = useState(0);
  const onStarClick = (nextValue) => {
    setRating(nextValue);
  };

  // Product data query
  const {
    data: product = {},
    isLoading: productLoading,
    refetch: refetchProduct
  } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axiosPublic(`/product/${id}`);
      return data;
    },
  });

  // Reviews data query
  const {
    data: reviews = [],
    isLoading: reviewsLoading,
    refetch: refetchReviews
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const { data } = await axiosPublic(`/reviews/${id}`);
      return data;
    },
  });

  const handleReport = async (e) => {
    e.preventDefault();
  
    const reportData = {
      productId: product._id,
      productName: product.productName,
      userEmail:user?.email,
    };
  
    try {
      await axiosPublic.post('/reports', reportData);
      toast.success('Report Added Successfully!');
    } catch (error) {
      toast.error('You have already reported this product.');
    }
  };
  


  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!description || rating === 0) {
      toast.error('Please fill all fields before submitting.');
      return;
    }
    const reviewData = {
      reviewerName: user?.displayName,
      reviewerImage: user?.photoURL,
      description,
      rating,
      productId: product._id,
    };

    try {
      await axiosPublic.post('/reviews', reviewData);
      toast.success('Review Added Successfully!');
      setDescription('');
      setRating(0);

      refetchReviews();
    } catch (err) {
      console.error('Error submitting review:', err);
      toast.error('Failed to submit review');
    }
  };

  const handleUpvote = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await axiosPublic.post(`/upvote/${productId}`, {
        email: user?.email,
      });

      if (response.status === 200) {
        toast.success('Vote successful');
        refetchProduct();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  if (productLoading || reviewsLoading) return <LoadingSpinner />;


  return (
    <div className="container md:pt-24 pt-4 mx-auto">
       <Helmet>
        <title> TechDiscoverly | Product Details</title>
      </Helmet>
      <div className="md:flex gap-10">
        {/* Product Details Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mx-4 md:mx-0 mb-6 ">
          <img src={product.productImage} alt={product.productName} className="w-full md:h-[435px] rounded-md" />
          <div className="flex-grow">
            <h2 className="md:text-2xl font-bold  text-[#8D0B41] mt-4">{product.productName}</h2>
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
            <Link to={product.link}  target="_blank">
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
        <div className="bg-white shadow-md rounded-lg p-6 mx-4 md:mx-auto md:w-1/2  justify-center  md:h-1/4  mb-8">
          <h3 className="md:text-4xl text-[#8D0B41] text-center font-bold mb-4">Post a Review</h3>
          <div className="flex flex-col">
            <form onSubmit={handleReviewSubmit} className="space-y-4">

              <div>
    

                <img className="w-20  h-20 mx-auto rounded-full " src={user?.photoURL} alt="" />
                <input placeholder={user?.displayName} readOnly className="input mt-3 read-only:bg-gray-100 input-bordered w-full " />
              </div>
              <div>
                <label className="block   font-bold mb-2 ">Review </label>
                <textarea value={description}
                  placeholder="Type here"
                  onChange={(e) => setDescription(e.target.value)} className="w-full h-28 px-3 py-2 border rounded" required />
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
      <div className="flex gap-36">
      <div className="bg-white shadow-md  rounded-lg p-6 mb-6">
        <h3 className="md:text-3xl text-center font-bold mb-4 text-[#8D0B41]">⭐ Reviews ⭐</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (

          <div >

            {reviews.map((review) => (
              <div key={review.id} className="border p-4  mb-5 items-center rounded-md">
                <div className="flex flex-col justify-center items-center gap-2">
                  <img src={review.reviewerImage} alt={review.reviewerName} className="w-10 md:w-14 h-10 md:h-14 rounded-full" />
                  <span className="md:text-xl font-bold text-[#8D0B41]">{review.reviewerName}</span>
                </div>
                <p className="mt-2">{review.description}</p>
                <div className="flex justify-center items-center mt-4 space-x-1">
                  {Array(review.rating)
                    .fill()
                    .map((_, index) => (
                      <span key={index} className="text-yellow-500 text-2xl">
                        &#9733;
                      </span>
                    ))}
                </div>

              </div>
            ))}
          </div>

        )}
      </div>
      <div className="md:w-1/2 hidden md:block"></div>
      </div>


    </div>
  );
};

export default ProductDetails;