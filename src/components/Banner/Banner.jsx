
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../../assets/1.jpeg'
import img2 from '../../assets/2.jpeg'
import img3 from '../../assets/3.jpeg'
import { Link } from "react-router-dom";
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
  
  };
  return (
    <Slider {...settings} className="pt-16">
        <div
        className="relative md:h-[500px]"
        
      >
        <img className="w-full " src={img1} alt="" />
        <div className="absolute top-0 left-0 z-10 w-full md:h-[500px] bg-[#11111193] flex flex-col items-center justify-center">
        <p className="text-white md:text-4xl font-bold  mb-4"> 
  Discover the Latest Tech Innovations: Web Apps, AI Tools, Games & More!
  </p>
  <Link to={'/products'} className=" w-48 mx-auto">
 <button className="btn hover:bg-[#D39D55] bg-[#8D0B41] text-white ">Explore More</button>
 </Link>
</div>

      </div>
      <div
        className="relative md:h-[500px]"
        
      >
        <img className="w-full " src={img2} alt="" />
<div className="absolute top-0 left-0 z-10 w-full md:h-[500px] bg-[#11111193] flex flex-col items-center justify-center">
  <p className="text-white md:text-4xl font-bold  mb-4"> 
  Empowering Creators, Connecting Innovators!
  </p>
 <Link to={'/products'} className=" w-48 mx-auto">
 <button className="btn hover:bg-[#D39D55] bg-[#8D0B41] text-white ">Explore More</button>
 </Link>
</div>

      </div><div
        className="relative md:h-[500px]"
        
      >
        <img className="w-full " src={img3} alt="" />
        <div className="absolute top-0 left-0 z-10 w-full md:h-[500px] bg-[#11111193] flex flex-col items-center justify-center">
        <p className="text-white md:text-4xl font-bold  mb-4"> 
  Discover, Upvote, Review – Powering Tech Exploration!
  </p>
  <Link to={'/products'} className=" w-48 mx-auto">
 <button className="btn hover:bg-[#D39D55] bg-[#8D0B41] text-white ">Explore More</button>
 </Link>
</div>

      </div>
    </Slider>
  );
};

export default Banner;
