import React, { Fragment, useState, useContext } from "react";
import { loginReq } from "./fetchApi";
import { LayoutContext } from "../index";
import { useSnackbar } from 'notistack';
import { LogIn } from "lucide-react";

const Login = (props) => {
  const { data: layoutData, dispatch: layoutDispatch } = useContext(
    LayoutContext
  );

  const [data, setData] = useState({
    email: "",
    password: "",
    error: false,
    loading: true,
  });

  const alert = (msg) => <div className="text-xs text-red-500 mt-1">{msg}</div>;

  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        email: data.email,
        password: data.password,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({ email: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        enqueueSnackbar('Login Completed Successfully..!', { variant: 'success' })
        window.location.href = "/";

      }    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400 text-sm">Enter your credentials to access your account</p>
      </div>

      {layoutData.loginSignupError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6 text-center">
          You need to login for checkout.
        </div>
      )}

      <form className="space-y-5">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, email: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.email}
            type="text"
            id="email"
            placeholder="name@example.com"
            className={`bg-black/20 border ${data.error ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </label>
            <a href="/" className="text-xs text-neon-blue hover:text-white transition-colors">
              Forgot Password?
            </a>
          </div>
          <input
            onChange={(e) => {
              setData({ ...data, password: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.password}
            type="password"
            id="password"
            placeholder="••••••••"
            className={`bg-black/20 border ${data.error ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>

        <div className="flex items-center space-x-2">
          <input
              type="checkbox"
              id="rememberMe"
            className="w-4 h-4 rounded border-gray-600 text-neon-blue focus:ring-neon-blue bg-black/20"
            />
          <label htmlFor="rememberMe" className="text-sm text-gray-400 cursor-pointer select-none">
            Keep me signed in
          </label>
        </div>

        <button
          onClick={(e) => { e.preventDefault(); formSubmit(); }}
          className="w-full py-3 bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all flex items-center justify-center space-x-2 mt-4"
        >
          <span>Login to Account</span>
          <LogIn size={18} />
        </button>
      </form>
    </Fragment>
  );
};

export default Login;
