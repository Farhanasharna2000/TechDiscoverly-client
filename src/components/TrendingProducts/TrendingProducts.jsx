import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useRole from "../../hooks/useRole";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import LoadingSpinner from "../LoadingSpinner";
import { Link } from "react-router-dom";


const TrendingProducts = () => {
    const [role]=useRole()
const axiosPublic=useAxiosPublic()
const {user}=useAuth()
const {
    data: trendingProducts = [],
    isLoading,
    
  } = useQuery({
    queryKey: ['trendingProducts'],
    queryFn: async () => {
      const { data } = await axiosPublic(`/trendingProducts`)

      return data
    },
  })
  console.log(trendingProducts)
  if (isLoading) return <LoadingSpinner />
    return (

    <div className="container mx-auto ">
      <SectionTitle               
                
                heading="Trending Products"
            /> 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingProducts.map((product) => (
          <div key={product.id} className="flex flex-col bg-white rounded-lg p-8 shadow-md">
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
             <Link to={'/productDetails'}>
             <button
           
           className="md:text-lg mt-4 font-semibold hover:text-[#8D0B41]"
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
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="">
                {role==="Admin"?
                   (<button
              
                   className="w-full flex  justify-end gap-2 px-4 py-2 rounded-lg font-medium transition-colors "
                   disabled                  
                 >
                   <img className="w-8" src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000" alt="" />
                   <span>{product.upvoteCount}</span>
                 </button>):(
                       <button
              
                       className="w-full flex  justify-end gap-2  rounded-lg font-medium transition-colors "
                       
                      
                     >
                       <img className="w-8 " src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000" alt="" />
                       <span>{product.upvoteCount}</span>
                     </button>
                 )
                }
           
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
    </div>
  );
};
 
export default TrendingProducts;