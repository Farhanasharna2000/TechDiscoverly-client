import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const Products = () => {
    return (
        <div className="container mx-auto md:pt-20">
          <Helmet>
                <title> TechDiscoverly | Products</title>
              </Helmet>  
              <SectionTitle
                
                
                heading="Products"
            />  
        </div>
    );
};

export default Products;