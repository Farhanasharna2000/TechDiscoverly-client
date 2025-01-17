import { Helmet } from "react-helmet-async"
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts"
import TrendingProducts from "../../components/TrendingProducts/TrendingProducts"
import Banner from "../../components/Banner/Banner"



const Home = () => {
  return (
    <div>
     <Helmet>
        <title> TechDiscoverly | Home</title>
      </Helmet>
     <Banner/>
     <FeaturedProducts/>
     <TrendingProducts/>
    </div>
  )
}

export default Home
