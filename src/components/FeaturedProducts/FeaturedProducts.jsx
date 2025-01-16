import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../LoadingSpinner";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import useRole from './../../hooks/useRole';
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";



const FeaturedProducts = () => {
const [role]=useRole()
const axiosPublic=useAxiosPublic()
const {user}=useAuth()
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

    <div className="container mx-auto ">
       <SectionTitle
                
                
                heading="Featurd Products"
            />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featurdProducts.map((product) => (
          <div key={product.id} className="flex flex-col bg-white rounded-lg shadow-md">
            {/* Card Header */}
            <div className="p-0">
              <img
                src={product.productImage}
                alt={product.productName}
                className="w-full h-56 rounded-t-lg"
              />
            </div>

            {/* Card Content */}
            <div className="flex-grow p-4">
             <Link to={`/productDetails/${product._id}`}>
             <button
           
           className="md:text-lg font-semibold hover:text-[#8D0B41] hover:underline"
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
            <div className="p-4 pt-0">
                {role==="Admin"?
                   (<button
              
                   className="w-full flex  justify-end gap-2 px-4 py-2 rounded-lg font-medium transition-colors "
                   disabled                  
                 >
                   <img className="w-8" src="https://img.icons8.com/?size=100&id=66628&format=png&color=000000" alt="" />
                   <span>{product.upvoteCount}</span>
                 </button>):(
                       <button
              
                       className="w-full flex  justify-end gap-2 px-4 py-2 rounded-lg font-medium transition-colors "
                       
                      
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
    </div>
  );
};

export default FeaturedProducts;

