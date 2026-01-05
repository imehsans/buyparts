import React, { Fragment, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "./Action";
import { DashboardUserContext } from "./Layout";
import { User, ShoppingBag, Heart, Settings, LogOut } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const Sidebar = (props) => {
  const { data } = useContext(DashboardUserContext);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "My Orders", path: "/user/orders", icon: <ShoppingBag size={20} /> },
    { name: "My Accounts", path: "/user/profile", icon: <User size={20} /> },
    { name: "My Wishlist", path: "/wish-list", icon: <Heart size={20} /> },
    { name: "Settings", path: "/user/setting", icon: <Settings size={20} /> },
  ];

  return (
    <Fragment>
      <div className="flex flex-col w-full md:w-3/12 space-y-4 mb-4 md:mb-0">

        {/* Profile Card */}
        <div className="glass-panel p-6 flex flex-col items-center justify-center space-y-2 border border-white/5 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-800 to-black p-1 shadow-[0_0_15px_rgba(0,243,255,0.2)] overflow-hidden">
            {data.userDetails && data.userDetails.userImage ? (
              <img
                src={`${apiURL}/uploads/user/${data.userDetails.userImage}`}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
              />
            ) : (
              <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center">
                <User size={40} className="text-gray-300 group-hover:text-neon-blue transition-colors" />
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400">Hello,</span>
            <span className="text-xl font-bold text-white tracking-wide">
              {data.userDetails ? data.userDetails.name : "User"}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col space-y-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={(e) => navigate(item.path)}
              className={`${
                location.pathname === item.path
                  ? "bg-neon-blue/10 text-neon-blue border-l-2 border-neon-blue"
                  : "text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                } cursor-pointer px-4 py-3 rounded-r-lg transition-all duration-300 flex items-center space-x-3 font-medium`}
            >
              <span className={location.pathname === item.path ? "text-neon-blue" : ""}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </div>
          ))}

          <div className="border-t border-white/10 my-2"></div>

          <div
            onClick={(e) => logout()}
            className="text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 flex items-center space-x-3 font-medium border-l-2 border-transparent"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
