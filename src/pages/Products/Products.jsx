import { Helmet } from "react-helmet-async";
import useRole from "../../hooks/useRole";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { useState } from "react";

const Products = () => {
    const [role] = useRole();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [inputTag, setInputTag] = useState("");
    const [searchTag, setSearchTag] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 6; // Products per page

    const {
        data: productsData,
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['acceptedProducts', searchTag, currentPage],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            if (searchTag) queryParams.append('tag', searchTag);
            queryParams.append('page', currentPage);
            queryParams.append('limit', limit);
            
            const { data } = await axiosPublic(`/acceptedProducts?${queryParams.toString()}`);
            return data;
        },
    });

    const handleSearch = () => {
        setCurrentPage(1); // Reset to first page on new search
        setSearchTag(inputTag);
    };

    const handleReset = () => {
        setInputTag("");
        setSearchTag("");
        setCurrentPage(1);
    };

    if (isLoading) return <LoadingSpinner />;

    const products = productsData?.products || [];
    const totalPages = productsData?.totalPages || 1;

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-4 py-2 mx-1 rounded ${
                        currentPage === i
                            ? 'bg-[#8D0B41] text-white'
                            : 'bg-gray-200 hover:bg-[#D39D55] hover:text-white'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="container mx-auto mb-8">
            <Helmet>
                <title>TechDiscoverly | Products</title>
            </Helmet>
            <div className="flex justify-center items-center gap-4 md:pt-20">
                <input
                    type="text"
                    placeholder="Search by tag"
                    className="input input-bordered input-secondary w-full max-w-xs"
                    value={inputTag}
                    onChange={(e) => setInputTag(e.target.value)}
                />
                <div className="md:w-auto text-center">
                    <button
                        onClick={handleSearch}
                        className="btn my-8 font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white hover:scale-105 transition-transform"
                    >
                        Search
                    </button>
                    <button
                        onClick={handleReset}
                        className="btn ml-4 hover:text-red-600 font-bold hover:bg-gray-300 bg-red-600 text-white w-full md:w-auto"
                    >
                        Reset
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="flex flex-col bg-white rounded-lg p-8 shadow-md">
                        <div className="">
                            <img
                                src={product.productImage}
                                alt={product.productName}
                                className="w-full h-56 rounded-lg"
                            />
                        </div>

                        <div className="flex-grow">
                            <Link to={`/productDetails/${product._id}`}>
                                <button className="md:text-lg mt-4 hover:underline font-semibold hover:text-[#8D0B41]">
                                    {product.productName}
                                </button>
                            </Link>

                            <div className="mt-2 flex flex-wrap gap-2">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-[#D6CFB4]/40 text-gray-700 text-sm font-medium px-2 py-1 rounded-md"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="">
                            {role === "Admin" ? (
                                <button
                                    className="w-full flex justify-end gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
                                    disabled
                                >
                                    <img className="w-8" src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000" alt="" />
                                    <span>{product.upvoteCount}</span>
                                </button>
                            ) : (
                                <button
                                    className="w-full flex justify-end gap-2 rounded-lg font-medium transition-colors"
                                >
                                    <img className="w-8" src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000" alt="" />
                                    <span>{product.upvoteCount}</span>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-[#D39D55] hover:text-white disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:text-black"
                >
                    Previous
                </button>
                {renderPaginationButtons()}
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-[#D39D55] hover:text-white disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:text-black"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;