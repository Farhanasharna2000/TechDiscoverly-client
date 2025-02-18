import { Helmet } from "react-helmet-async"
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts"
import TrendingProducts from "../../components/TrendingProducts/TrendingProducts"
import Banner from "../../components/Banner/Banner"
import NewsLetter from "../../components/NewsLetter/NewsLetter"
import FAQ from './../../components/FAQ/FAQ';
import Testimonial from './../../components/Testimonial/Testimonial';
import Trusted from "../../components/Trusted/Trusted"



const Home = () => {
  return (
    <div 
    style={{
      overflowX: "hidden",
      margin: 0,
      padding: 0,
      width: "100%",
    }}>
     <Helmet>
        <title> TechDiscoverly | Home</title>
      </Helmet>
     <Banner/>
     <FeaturedProducts/>
     <TrendingProducts/>
     <Testimonial/>
     <FAQ/>
     <NewsLetter/>
     <Trusted/>
    </div>
  )
}

export default Home
