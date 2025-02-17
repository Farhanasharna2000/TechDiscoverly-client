import { AiOutlineShopping } from "react-icons/ai";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { MdLibraryAdd, MdRateReview, MdReportProblem } from "react-icons/md";
import { RiCouponFill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../../hooks/useRole";


const Dashboard = () => {
  const [role] = useRole();


  return (
    <div className="flex">
     
      {/* dashboard side bar */}
      <div className="md:w-64 w-36 min-h-screen  bg-[#6699CC] text-white">
        <ul className="menu md:p-4">
          <>
            {/* User */}
            {role === "User" && (
              <>
                <li>
                  <NavLink to="/dashboard/my-profile">
                    <FaUser className="md:text-xl" />
                    My Profile
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
          </>
          <div className="divider"></div>
          {/* Shared nav links */}
          <li>
            <NavLink to="/">
              <FaHome className="md:text-xl"/>
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 md:px-8 bg-[#FFF8E6]/30">
        <Outlet />
      </div>
      
    </div>
  );
};

export default Dashboard;
