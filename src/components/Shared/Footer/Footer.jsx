import { FaFacebook, FaLinkedin } from "react-icons/fa"
import { IoLogoWhatsapp } from "react-icons/io"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <footer className=' bg-[#D6CFB4]/40 '>
      <div className="container pt-6 mx-auto ">
        {/* Logo */}
        {/* <img className="mx-auto" src={logo} alt="VisaZen Logo" /> */}
<p className="text-center">TechDiscoverly</p>
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-6">
          {/* About Us */}
          <div>
            <h2 className="font-bold text-lg mb-4 text-[#8D0B41]">About Us</h2>
            <p>
            A user-driven platform for discovering, sharing, and reviewing tech products, with voting, moderation, and premium subscription features!
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="font-bold text-lg mb-4 text-[#8D0B41]">Contact Us</h2>
            <p>
              <a href="#" className="hover:underline hover:text-[#8D0B41]">
                info@techdiscoverly.com
              </a>
            </p>
            <p>
              <a href="#" className="hover:underline hover:text-[#8D0B41]">
                +123 456 7890
              </a>
            </p>
            <p>Dhaka, Bangladesh</p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="font-bold text-lg mb-4 text-[#8D0B41]">Quick Links</h2>
            <div className="space-y-2">
              <Link to="/" className="block hover:underline hover:text-[#8D0B41]">
                Home
              </Link>
              <Link to="/products" className="block hover:underline hover:text-[#8D0B41]">
                Products
              </Link>
              <div className="flex">
                <Link to="/login" className="block hover:underline mr-1 hover:text-[#8D0B41]">
                  Login /
                </Link>
                <Link to="/register" className="block hover:underline hover:text-[#8D0B41]">
                  Register
                </Link>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h2 className="font-bold text-lg mb-4 text-[#8D0B41]">Follow Us</h2>
            {/* Social Media Icons */}
            <div className=' flex gap-3 text-2xl'>
            <a href="https://www.facebook.com/farhana.sharna.2024" target="_blank" rel="noopener noreferrer">
    <p className="hover:text-[#8D0B41]"><FaFacebook /></p>
  </a>
  <a href="https://wa.me/1852681759" target="_blank" rel="noopener noreferrer">
    <p className="hover:text-[#8D0B41]"><IoLogoWhatsapp /></p>
  </a>
  <a href="https://www.linkedin.com/in/farhana-sharna" target="_blank" rel="noopener noreferrer">
    <p className="hover:text-[#8D0B41]"><FaLinkedin /></p>
  </a>

            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className='py-6 text-sm text-center text-[#8D0B41]'>
        © 2024-2025 TechDiscoverly . All rights reserved.
      </div>
      </div>
   
    </footer>
  )
}

export default Footer
