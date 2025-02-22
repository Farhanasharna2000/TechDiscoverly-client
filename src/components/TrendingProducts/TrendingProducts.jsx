import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import LoadingSpinner from "../LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Coupon from "./Coupon";


const TrendingProducts = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const navigate = useNavigate()
    const {
        data: trendingProducts = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['trendingProducts'],
        queryFn: async () => {
            const { data } = await axiosPublic(`/trendingProducts`)

            return data
        },
    })

    if (isLoading) return <LoadingSpinner />

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
                refetch()

            }

        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };


    return (

        <div className="container mx-auto md:px-4">
            <SectionTitle

                heading="Trending Products"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-4 md:mx-0 gap-4 md:gap-6">
                {trendingProducts.map((product) => (
                    <div key={product.id} className="flex flex-col bg-white rounded-lg p-4 shadow-md">
                        {/* Card Header */}
                        <div >
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="w-full  h-40 rounded-lg"
                            />
                        </div>

                        {/* Card Content */}
                        <div className="flex-grow ">
                        <button

className="md:text-lg mt-4 font-semibold "
>
{product.productName}
</button>
                            
                            <p className="text-sm md:text-base">{product.description.slice(0, 30)}...</p>
                            <div className="my-3 flex flex-wrap gap-2">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-[#D6CFB4]/40 text-gray-700 text-sm font-medium px-2 py-1 rounded-md"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card Footer */}
                        
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => handleUpvote(product._id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${product.ownerEmail === user?.email ? 'cursor-not-allowed opacity-50' : ''
                                    }`}
                                disabled={product.ownerEmail === user?.email}
                            >
                                <img
                                    className="w-8"
                                    src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000"
                                    alt=""
                                />
                                <span>{product.upvoteCount}</span>
                            </button>
                            <Link to={`/productDetails/${product._id}`}>
                            <button className="px-4 py-2 mt-2 text-sm bg-[#8D0B41] text-white hover:bg-[#D39D55] rounded-lg">See More</button>

                            </Link>
                           

                        </div>

                    </div>
                ))}
            </div>
            <div className="text-center">
                <Link to={'/products'}>
                    <button className="btn my-8  font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white   hover:scale-105 transition-transform">
                        Show All Products
                    </button>
                </Link>
            </div>
            <Coupon />
        </div>
    );
};

export default TrendingProducts;