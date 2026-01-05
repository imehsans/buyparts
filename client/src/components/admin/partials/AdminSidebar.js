import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Layers, Truck, CreditCard } from "lucide-react";

const AdminSidebar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={24} />,
    },
    {
      name: "Main Categories",
      path: "/admin/dashboard/main-categories",
      icon: <Layers size={24} />,
    },
    {
      name: "Categories",
      path: "/admin/dashboard/categories",
      icon: <Layers size={24} />,
    },
    {
      name: "Products",
      path: "/admin/dashboard/products",
      icon: <ShoppingBag size={24} />,
    },
    {
      name: "Orders",
      path: "/admin/dashboard/orders",
      icon: <Truck size={24} />,
    },
    {
      name: "Payment Settings",
      path: "/admin/dashboard/payment-settings",
      icon: <CreditCard size={24} />,
    },
  ];

  return (
    <Fragment>
      <div
        id="sidebar"
        className="hidden md:flex flex-col sticky top-0 left-0 h-screen md:w-3/12 lg:w-2/12 bg-dark-surface border-r border-gray-800 text-gray-400 z-50 backdrop-blur-md bg-opacity-90"
      >
        <div className="p-6 flex items-center justify-center border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white tracking-widest uppercase">
            Admin<span className="text-neon-blue">.</span>
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto py-6 space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`
                  group flex items-center px-6 py-4 cursor-pointer transition-all duration-300 relative
                  ${isActive
                    ? "text-neon-blue bg-white/5"
                    : "hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-blue shadow-[0_0_10px_#00f3ff]"></div>
                )}

                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                <span className="ml-4 font-medium tracking-wide">{item.name}</span>

                {isActive && (
                  <div className="absolute right-4 w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_#00f3ff]"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-6 border-t border-gray-800 text-xs text-center text-gray-600">
          © 2080 BUYPARTS
        </div>
      </div>
    </Fragment>
  );
};

export default AdminSidebar;
