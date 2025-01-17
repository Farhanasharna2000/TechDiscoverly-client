
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { AiOutlineMenu } from 'react-icons/ai'
import useRole from '../../../hooks/useRole'
import logo from '../../../assets/logotech.png'
const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [role]=useRole()
  const links =
  <>

      <li>
          <NavLink
              className={({ isActive }) =>
                  `font-extrabold hover:bg-[#D39D55] hover:text-white ${isActive ?
                      " text-[#8D0B41]" :
                      
                      " "}`
              }
              to="/"
          >
              Home
          </NavLink>
      </li>
    
      <li>
          <NavLink
              className={({ isActive }) =>
                  `font-extrabold  hover:bg-[#D39D55] hover:text-white  ${isActive ?
                      " text-[#8D0B41]" :
                      
                      " "}`
              }
              to="/products"
          >
             Products
          </NavLink>
      </li>
  </>
  return (
    <div className='md:fixed  z-10 bg-white shadow-md w-full'>
    <div className=''>
      <div className="navbar container mx-auto  ">
        <div className="navbar-start">
      <img className='w-56' src={logo} alt="" /> 
  
          
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 ">{links}</ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <div className="flex gap-3 items-center">
               {/* Dropdown Menu */}
            <div className='relative z-10'>
              <div className='flex  flex-row items-center gap-3'>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user?.photoURL }
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3  transition font-semibold'
                    >
                      Home
                    </Link>
                    <Link
                      to='/products'
                      className='block md:hidden px-4 py-3  transition font-semibold'
                    >
                      Products
                    </Link>

                    {user ? (
                      <>
                      <div className='px-4 py-3  transition cursor-default  text-[#8D0B41] hidden md:block font-bold'> {user?.displayName || "Hello, User!"}</div>
                        <Link
                         to={
                          role === 'User'
                            ? '/dashboard/my-profile'
                            : role === 'Moderator'
                            ? '/dashboard/product-review-queue'
                            : role === 'Admin'
                            ? '/dashboard/statistics'
                            : '/dashboard' 
                        }
                          className='px-4 py-2 hover:text-white hover:bg-[#D39D55]   transition font-semibold'
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className='px-4 py-2 hover:text-white hover:bg-[#D39D55]  transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                      <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-[#D39D55] bg-[#8D0B41] text-white  transition font-semibold'
                        >
                         Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-[#D39D55] bg-[#8D0B41] text-white  transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            </div>
          ) : (
            <div className="flex gap-3">
               <NavLink to="/login">
                <button className="btn  font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white   hover:scale-105 transition-transform">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="btn  font-extrabold hover:bg-[#D39D55] bg-[#8D0B41] text-white   hover:scale-105 transition-transform">
                  Register
                </button>
              </NavLink>

            </div>
          )}
        </div>
      

      </div>
    </div>
  </div>
  )
}

export default Navbar
