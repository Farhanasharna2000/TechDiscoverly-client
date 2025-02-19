import { AiOutlineShopping } from "react-icons/ai";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { MdLibraryAdd, MdRateReview, MdReportProblem } from "react-icons/md";
import { RiCouponFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";
import { GrOverview } from "react-icons/gr";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../hooks/UseTheme";

const Dashboard = () => {
  const [role] = useRole();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className="flex bg-[#FFF8E6]/30">
      {/* Dashboard sidebar */}
      <div className="md:w-[20%]   h-full fixed bg-[#6699CC] text-white">
        <ul className="menu md:p-4">
          {/* Shared nav links */}
          <li>
            <NavLink to="/">
              <FaHome className="md:text-xl" />
              Home
            </NavLink>
          </li>

          {/* User */}
          {role === "User" && (
            <>
             <li>
                <NavLink to="/dashboard/overview">
                  <GrOverview className="md:text-xl"/>
                  Overview
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/add-product">
                  <MdLibraryAdd className="md:text-xl" />
                  Add Product
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-products">
                  <AiOutlineShopping className="md:text-xl" />
                  My Products
                </NavLink>
              </li>
            </>
          )}

          {/* Admin */}
          {role === "Admin" && (
            <>
             
              <li>
                <NavLink to="/dashboard/statistics">
                  <IoStatsChart className="md:text-xl" />
                  Statistics
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users">
                  <FaUsers className="md:text-xl" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-coupons">
                  <RiCouponFill className="md:text-xl" />
                  Manage Coupons
                </NavLink>
              </li>
            </>
          )}

          {/* Moderator */}
          {role === "Moderator" && (
            <>
           
              <li>
                <NavLink to="/dashboard/product-review-queue">
                  <MdRateReview className="md:text-xl" />
                  Product Review Queue
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reported-contents">
                  <MdReportProblem className="md:text-xl" />
                  Reported Contents
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Dashboard content */}
      <div className="flex-1  ml-[35%] md:ml-[20%]">
        {/* Navbar at the top of the content area */}
        <div className="bg-white px-4 py-2 shadow-lg ml-[20%] md:px-8 fixed top-0 left-0 right-0 z-10">
          
          <div className="flex justify-end items-center">
            <NavLink to="/dashboard/my-profile" className="space-x-2">
              <FaUser className="text-4xl rounded-full border p-2" />
            </NavLink>
            <button
            onClick={toggleTheme}
            className="btn btn-ghost rounded-full px-2 ml-3"
          >
            {theme === 'light' ? (
              <FiMoon className="text-2xl text-[#8D0B41]" />
            ) : (
              <FiSun className="text-2xl text-yellow-300" />
            )}
          </button>
          </div>
        </div>

        {/* Outlet for rendering nested routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
