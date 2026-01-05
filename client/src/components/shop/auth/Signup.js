import React, { Fragment, useState } from "react";
import { signupReq } from "./fetchApi";
import { useSnackbar } from 'notistack';
import { UserPlus } from "lucide-react";

const Signup = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
  });

  const alert = (msg, type) => (
    <div className={`text-sm ${type === "green" ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-red-400 bg-red-400/10 border-red-400/20"} border p-3 rounded mb-4 text-center`}>{msg}</div>
  );
  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
        })
        enqueueSnackbar('Account Created Successfully..!', { variant: 'success' })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-gray-400 text-sm">Join the future of auto parts trading</p>
      </div>

      <form className="space-y-4">
        {data.success ? alert(data.success, "green") : ""}

        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-300 mb-1">
            Full Name
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                name: e.target.value,
              })
            }
            value={data.name}
            type="text"
            id="name"
            placeholder="John Doe"
            className={`bg-black/20 border ${data.error.name ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all`}
          />
          {!data.error ? "" : <span className="text-xs text-red-500 mt-1">{data.error.name}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-300 mb-1">
            Email Address
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                email: e.target.value,
              })
            }
            value={data.email}
            type="email"
            id="email"
            placeholder="name@example.com"
            className={`bg-black/20 border ${data.error.email ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all`}
          />
          {!data.error ? "" : <span className="text-xs text-red-500 mt-1">{data.error.email}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                password: e.target.value,
              })
            }
            value={data.password}
            type="password"
            id="password"
            placeholder="••••••••"
            className={`bg-black/20 border ${data.error.password ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all`}
          />
          {!data.error ? "" : <span className="text-xs text-red-500 mt-1">{data.error.password}</span>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="cPassword" className="text-sm font-medium text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                cPassword: e.target.value,
              })
            }
            value={data.cPassword}
            type="password"
            id="cPassword"
            placeholder="••••••••"
            className={`bg-black/20 border ${data.error.cPassword ? "border-red-500" : "border-gray-700"} rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all`}
          />
          {!data.error ? "" : <span className="text-xs text-red-500 mt-1">{data.error.cPassword}</span>}
        </div>

        <button
          onClick={(e) => { e.preventDefault(); formSubmit(); }}
          className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(255,0,85,0.3)] transition-all flex items-center justify-center space-x-2 mt-4"
        >
          <span>Create Account</span>
          <UserPlus size={18} />
        </button>
      </form>
    </Fragment>
  );
};

export default Signup;
