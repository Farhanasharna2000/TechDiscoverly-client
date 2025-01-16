import { Helmet } from "react-helmet-async"
import Banner from "../../components/Banner/Banner"
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts"



const Home = () => {
  return (
    <div>
     <Helmet>
        <title> TechDiscoverly | Home</title>
      </Helmet>
     <Banner/>
     <FeaturedProducts/>
    </div>
  )
}

export default Home
