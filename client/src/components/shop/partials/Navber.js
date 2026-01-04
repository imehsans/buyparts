import React, { Fragment, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";

import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";

const Navber = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, dispatch } = useContext(LayoutContext);

  const navberToggleOpen = () =>
    data.navberHamburger
      ? dispatch({ type: "hamburgerToggle", payload: false })
      : dispatch({ type: "hamburgerToggle", payload: true });

  const loginModalOpen = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const cartModalOpen = () =>
    data.cartModal
      ? dispatch({ type: "cartModalToggle", payload: false })
      : dispatch({ type: "cartModalToggle", payload: true });

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-lg font-medium tracking-wide cursor-pointer transition-all duration-300 ${location.pathname === path
      ? "text-brand-orange bg-white/5 shadow-[0_0_15px_rgba(253,126,20,0.2)]"
      : "text-gray-300 hover:text-white hover:bg-white/5"
    }`;

  return (
    <Fragment>
      {/* Floating Glass Navbar */}
      <nav className="fixed top-4 left-4 right-4 z-50 glass-panel rounded-xl border border-white/5">
        <div className="mx-6 my-3 grid grid-cols-4 lg:grid-cols-3 items-center">

          {/* Mobile Menu Icon */}
          <div className="col-span-1 lg:hidden flex items-center">
            <svg
              onClick={(e) => navberToggleOpen()}
              className="w-8 h-8 cursor-pointer text-brand-orange hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex col-span-1 items-center space-x-2">
            <span
              className={navLinkClass("/")}
              onClick={(e) => navigate("/")}
            >
              Shop
            </span>
            <span
              className={navLinkClass("/blog")}
              onClick={(e) => navigate("/blog")}
            >
              Blog
            </span>
            <span
              className={navLinkClass("/contact-us")}
              onClick={(e) => navigate("/contact-us")}
            >
              Contact
            </span>
          </div>

          {/* Logo */}
          <div
            onClick={(e) => navigate("/")}
            className="col-span-2 lg:col-span-1 text-center cursor-pointer group"
          >
            <span className="text-3xl font-black tracking-tighter uppercase inline-block group-hover:scale-105 transition-transform duration-300">
              <span className="text-brand-orange">BUY</span>
              <span className="text-white">PARTS</span>
              <span className="text-gray-400 text-xl">.PK</span>
            </span>
          </div>

          {/* Right Actions */}
          <div className="col-span-1 flex justify-end items-center space-x-4">

            {/* Wishlist */}
            <div
              onClick={(e) => navigate("/wish-list")}
              className="relative p-2 rounded-full hover:bg-white/5 transition-all cursor-pointer group"
              title="Wishlist"
            >
              <svg
                className={`w-6 h-6 transition-colors ${location.pathname === "/wish-list" ? "text-red-500 fill-current" : "text-gray-400 group-hover:text-red-400"
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>

            {/* Account / Login */}
            {localStorage.getItem("jwt") ? (
              <div className="relative group">
                <div className="p-2 rounded-full hover:bg-white/5 transition-all cursor-pointer">
                  <svg
                    className="w-6 h-6 text-gray-400 group-hover:text-brand-orange"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>

                {/* Dropdown */}
                <div className="absolute right-0 mt-4 w-48 bg-brand-dark border border-white/10 rounded-xl shadow-2xl overflow-hidden hidden group-hover:block transfrom origin-top-right transition-all">
                  <div className="py-1">
                    {!isAdmin() ? (
                      <>
                        <div onClick={() => navigate("/user/orders")} className="px-4 py-3 hover:bg-white/5 cursor-pointer text-gray-300 hover:text-brand-orange flex items-center space-x-2">
                          <span>Orders</span>
                        </div>
                        <div onClick={() => navigate("/user/profile")} className="px-4 py-3 hover:bg-white/5 cursor-pointer text-gray-300 hover:text-brand-orange flex items-center space-x-2">
                          <span>Profile</span>
                        </div>
                        <div onClick={() => navigate("/wish-list")} className="px-4 py-3 hover:bg-white/5 cursor-pointer text-gray-300 hover:text-brand-orange flex items-center space-x-2">
                          <span>Wishlist</span>
                        </div>
                        <div onClick={() => navigate("/user/setting")} className="px-4 py-3 hover:bg-white/5 cursor-pointer text-gray-300 hover:text-brand-orange flex items-center space-x-2">
                          <span>Settings</span>
                        </div>
                      </>
                    ) : (
                      <div onClick={() => navigate("/admin/dashboard")} className="px-4 py-3 hover:bg-white/5 cursor-pointer text-gray-300 hover:text-brand-orange flex items-center space-x-2">
                        <span>Admin Dashboard</span>
                      </div>
                    )}
                    <div onClick={logout} className="px-4 py-3 hover:bg-red-500/10 cursor-pointer text-red-400 hover:text-red-300 flex items-center space-x-2 border-t border-white/10">
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={(e) => loginModalOpen()}
                className="p-2 rounded-full hover:bg-white/5 transition-all cursor-pointer group"
                title="Login"
              >
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-brand-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
            )}

            {/* Cart */}
            <div
              onClick={(e) => cartModalOpen()}
              className="relative p-2 rounded-full hover:bg-white/5 transition-all cursor-pointer group"
              title="Cart"
            >
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-brand-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-brand-orange text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                {data.cartProduct ? data.cartProduct.length : 0}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${data.navberHamburger ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
            } lg:hidden transition-all duration-300 overflow-hidden bg-brand-dark/95 backdrop-blur-md rounded-b-xl border-t border-white/5`}
        >
          <div className="flex flex-col text-gray-300 p-4 space-y-2">
            <span
              className="hover:text-brand-orange hover:bg-white/5 px-3 py-2 rounded-lg cursor-pointer transition-colors"
              onClick={(e) => navigate("/")}
            >
              Shop
            </span>
            <span
              className="hover:text-brand-orange hover:bg-white/5 px-3 py-2 rounded-lg cursor-pointer transition-colors"
              onClick={(e) => navigate("/blog")}
            >
              Blog
            </span>
            <span
              className="hover:text-brand-orange hover:bg-white/5 px-3 py-2 rounded-lg cursor-pointer transition-colors"
              onClick={(e) => navigate("/contact-us")}
            >
              Contact
            </span>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-24"></div>
    </Fragment>
  );
};

export default Navber;
