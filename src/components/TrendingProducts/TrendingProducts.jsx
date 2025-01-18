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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 md:mx-0 gap-4 md:gap-6">
                {trendingProducts.map((product) => (
                    <div key={product.id} className="flex flex-col bg-white rounded-lg p-4 md:p-8 shadow-md">
                        {/* Card Header */}
                        <div className="">
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="w-full  h-56 rounded-lg"
                            />
                        </div>

                        {/* Card Content */}
                        <div className="flex-grow ">
                            <Link to={`/productDetails/${product._id}`}>
                                <button

                                    className="md:text-lg mt-4 font-semibold hover:text-[#8D0B41] hover:underline"
                                >
                                    {product.productName}
                                </button>
                            </Link>

                            <div className="mt-2 flex flex-wrap gap-2">
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
                        <div >
                            <button
                                onClick={() => handleUpvote(product._id)}
                                className={`w-full flex justify-end gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${product.ownerEmail === user?.email ? 'cursor-not-allowed opacity-50' : ''}`}
                                disabled={product.ownerEmail === user?.email}
                            >
                                <img
                                    className="w-8"
                                    src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000"
                                    alt=""
                                />
                                <span>{product.upvoteCount}</span>
                            </button>
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
            <Coupon/>
        </div>
    );
};

export default TrendingProducts;