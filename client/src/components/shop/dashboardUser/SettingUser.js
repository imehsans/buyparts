import React, { Fragment, useState, useContext } from "react";
import Layout from "./Layout";
import { handleChangePassword } from "./Action";
import { DashboardUserContext } from "./Layout";
import { Lock, Eye, EyeOff, Save, ShieldCheck } from "lucide-react";

const SettingComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);

  const [fData, setFdata] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    success: false,
    error: false,
    passwordView: false,
    type: "password",
  });

  if (fData.success || fData.error) {
    setTimeout(() => {
      setFdata({ ...fData, success: false, error: false });
    }, 1500);
  }

  if (data.loading) {
    return (
      <div className="w-full md:w-9/12 flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-t-neon-blue border-gray-700 rounded-full animate-spin"></div>
        <span className="mt-4 text-gray-400">Loading Settings...</span>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:pl-8">
        <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden p-8">

          <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-white/5">
            <div className="p-3 bg-neon-blue/10 rounded-full">
              <ShieldCheck className="text-neon-blue" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide">Security Settings</h2>
              <p className="text-sm text-gray-400">Update your password and security preferences</p>
            </div>
          </div>

          <div className="flex flex-col space-y-6 max-w-2xl">
            {fData.success ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg flex items-center shadow-lg shadow-green-500/10">
                {fData.success}
              </div>
            ) : (
              ""
            )}
            {fData.error ? (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center shadow-lg shadow-red-500/10">
                {fData.error}
              </div>
            ) : (
              ""
            )}

            <div className="flex flex-col space-y-2">
              <label htmlFor="oldPassword" className="text-sm font-medium text-gray-300">Old Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input
                  onChange={(e) =>
                    setFdata({ ...fData, oldPassword: e.target.value })
                  }
                  value={fData.oldPassword}
                  type={fData.type}
                  id="oldPassword"
                  className="w-full bg-black/20 border border-gray-700 rounded-xl py-3 pl-12 pr-12 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                  placeholder="Enter current password"
                />
                <span
                  onClick={(e) =>
                    setFdata({
                      ...fData,
                      passwordView: !fData.passwordView,
                      type: !fData.passwordView ? "text" : "password",
                    })
                  }
                  className="absolute right-4 top-3.5 cursor-pointer text-gray-500 hover:text-white transition-colors"
                >
                  {fData.passwordView ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium text-gray-300">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input
                  onChange={(e) =>
                    setFdata({ ...fData, newPassword: e.target.value })
                  }
                  value={fData.newPassword}
                  type="password"
                  id="newPassword"
                  className="w-full bg-black/20 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                  placeholder="Enter new password"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input
                  onChange={(e) =>
                    setFdata({ ...fData, confirmPassword: e.target.value })
                  }
                  value={fData.confirmPassword}
                  type="password"
                  id="confirmPassword"
                  className="w-full bg-black/20 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <button
              onClick={(e) => handleChangePassword(fData, setFdata, dispatch)}
              className="w-full md:w-auto bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 mt-4"
            >
              <Save size={20} />
              <span>Change Password</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const SettingUser = (props) => {
  return (
    <Fragment>
      <Layout children={<SettingComponent />} />
    </Fragment>
  );
};

export default SettingUser;
