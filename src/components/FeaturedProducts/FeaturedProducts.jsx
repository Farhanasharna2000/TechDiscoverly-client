import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../LoadingSpinner";



const FeaturedProducts = () => {

const axiosPublic=useAxiosPublic()
const {
    data: featurdProducts = [],
    isLoading,
    
  } = useQuery({
    queryKey: ['featurdProducts'],
    queryFn: async () => {
      const { data } = await axiosPublic(`/featurdProducts`)

      return data
    },
  })
  console.log(featurdProducts)
  if (isLoading) return <LoadingSpinner />
    return (

    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featurdProducts.map((product) => (
          <div key={product.id} className="flex flex-col bg-white rounded-lg shadow-md">
            {/* Card Header */}
            <div className="p-0">
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </div>

            {/* Card Content */}
            <div className="flex-grow p-4">
              <button
           
                className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors"
              >
                {product.productName}
              </button>

              <div className="mt-2 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 text-sm font-medium px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 pt-0">
              <button
              
                className="w-full flex  justify-end gap-2 px-4 py-2 rounded-lg font-medium transition-colors "
                
               
              >
                <img className="w-8" src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000" alt="" />
                <span>{product.upvoteCount}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;

