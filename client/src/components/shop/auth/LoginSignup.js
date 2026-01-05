import React, { Fragment, useState, useContext } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { LayoutContext } from "../index";
import { X } from "lucide-react";

const LoginSignup = (props) => {
  const { data, dispatch } = useContext(LayoutContext);

  const [login, setLogin] = useState(true);
  const [loginValue, setLoginValue] = useState("Create an account");

  const loginSignupModalToggle = () =>
    data.loginSignupModal
      ? dispatch({ type: "loginSignupModalToggle", payload: false })
      : dispatch({ type: "loginSignupModalToggle", payload: true });

  const changeLoginSignup = () => {
    if (login) {
      setLogin(false);
      setLoginValue("Login");
    } else {
      setLogin(true);
      setLoginValue("Create an account");
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => loginSignupModalToggle()}
        className={` ${
          data.loginSignupModal ? "" : "hidden"
          } fixed top-0 left-0 z-40 w-full h-screen bg-black/80 backdrop-blur-sm transition-opacity duration-300`}
      ></div>

      {/* Signup Login Component Render */}
      <section
        className={` ${
          data.loginSignupModal ? "" : "hidden"
          } fixed z-50 inset-0 flex items-center justify-center overflow-auto animate-in zoom-in-95 duration-200`}
      >
        <div className="w-11/12 md:w-3/5 lg:w-[450px] relative bg-dark-card border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col p-6 md:p-8">

          {/* Close Button */}
          <button
            onClick={(e) => {
                loginSignupModalToggle();
                dispatch({ type: "loginSignupError", payload: false });
              }}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Main Content */}
          <div className="mt-4">
            {login ? <Login /> : <Signup />}
          </div>

          <div className="relative flex items-center py-6">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">Or</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <button
            onClick={(e) => changeLoginSignup()}
            className="w-full py-3 rounded-lg border border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 transition-all font-medium uppercase tracking-wider text-sm shadow-[0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]"
          >
            {loginValue}
          </button>

        </div>
      </section>
    </Fragment>
  );
};

export default LoginSignup;
