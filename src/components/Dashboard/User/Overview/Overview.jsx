import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import UseAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../LoadingSpinner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Overview = () => {
    const { user } = useAuth();
    const axiosSecure = UseAxiosSecure();
    const {
      data: products = [],
      isLoading,
    } = useQuery({
      queryKey: ['products', user?.email],
      queryFn: async () => {
        const { data } = await axiosSecure(`/products/${user?.email}`);
        return data;
      },
    });

    if (isLoading) return <LoadingSpinner />;

    // Assuming products is an array of product objects, and each has a upvoteCount property
    const chartData = products.map(product => ({
        name: product.productName, 
        upvotes: product.upvoteCount
    }));

    return (
        <div className="container mx-auto pt-20 ">
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="upvotes" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Overview;
