import { Helmet } from "react-helmet-async"
import Banner from "../../components/Banner/Banner"



const Home = () => {
  return (
    <div>
     <Helmet>
        <title> TechDiscoverly | Home</title>
      </Helmet>
     <Banner/>
    </div>
  )
}

export default Home
