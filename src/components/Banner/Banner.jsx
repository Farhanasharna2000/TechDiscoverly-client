import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../../assets/1.jpeg'
import img2 from '../../assets/2.jpeg'
import img3 from '../../assets/3.jpeg'
import { Link } from "react-router-dom";

const Banner = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
  
  };
  const slides = [
    {
      img: img1,
      caption: "Discover the Latest Tech Innovations: Web Apps, AI Tools, Games & More!",
    },
    {
      img: img2,
      caption: "Empowering Creators, Connecting Innovators!",
    },
    {
      img: img3,
      caption: "Discover, Upvote, Review – Powering Tech Exploration!",
    },
  ];
  return (
    <Slider {...settings} className="md:pt-16">
    {slides.map((slide, index) => (
      <div key={index} className="relative ">
        <div className="absolute inset-0 bg-black bg-opacity-40 blur-sm z-10"></div>
        <img className="w-full md:h-[500px] h-[250px] object-cover" src={slide.img} alt={`Slide ${index + 1}`} />
        <div className="absolute top-0 left-0 z-20 w-full h-full flex flex-col items-center justify-center">
          <p className="text-white md:text-4xl font-bold mb-4 text-center px-4">{slide.caption}</p>
          <Link to="/products" className="md:w-48 mx-auto">
            <button className="btn hover:bg-[#D39D55] bg-[#8D0B41] text-white">
              Explore More
            </button>
          </Link>
        </div>
      </div>
    ))}
  </Slider>
  );
};

export default Banner;