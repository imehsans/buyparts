import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Menu, LogOut, Settings, ShoppingBag, User } from "lucide-react";
import logo from "../../../assets/icon/logobuyparts.png";

const AdminNavber = (props) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishList");
    window.location.href = "/";
  };

  return (
    <Fragment>
      <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-dark-surface/80 border-b border-gray-800 shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">

          {/* Logo / Menu Trigger */}
          <div className="flex items-center space-x-4">
            <button className="lg:hidden text-gray-400 hover:text-white">
              <Menu size={24} />
            </button>
            <div
              onClick={(e) => navigate("/admin/dashboard")}
              className="hidden lg:block cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img src={logo} alt="BuyParts Admin" className="h-10 w-auto" />
            </div>
          </div>

          {/* Center Search (Optional) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500 group-focus-within:text-neon-blue transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg leading-5 bg-black/20 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-black/40 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue sm:text-sm transition-all"
              placeholder="Search command center..."
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">

            <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-neon-pink rounded-full animate-pulse-glow"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-gray-700"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple p-[1px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-300">Admin Commander</span>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] bg-dark-card ring-1 ring-black ring-opacity-5 py-1 text-gray-300 border border-gray-700 animate-in fade-in zoom-in-95 duration-200"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div
                    onClick={() => navigate("/")}
                    className="block px-4 py-2 text-sm hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <ShoppingBag size={16} />
                      <span>Store Front</span>
                    </div>
                  </div>
                  <div className="block px-4 py-2 text-sm hover:bg-white/10 hover:text-white cursor-pointer transition-colors">
                    <div className="flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 my-1"></div>
                  <div 
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut size={16} />
                      <span>Disconnect</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default AdminNavber;
