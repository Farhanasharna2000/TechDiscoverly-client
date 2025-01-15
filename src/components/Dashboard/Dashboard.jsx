import { FaHome } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
   

    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-[#D39D55] text-white">
                <ul className="menu p-4">
                    <>
                           
                            <li>
                                <NavLink to="/dashboard/add-product">
                                <MdLibraryAdd />
                                    Add Product</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/my-products">
                                <MdLibraryAdd />
                                    My Products</NavLink>
                            </li>
                           
                        </>
                           
                 
                    {/* shared nav links */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                  
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;