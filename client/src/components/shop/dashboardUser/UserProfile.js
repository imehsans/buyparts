import React, { Fragment, useContext, useState, useEffect } from "react";
import Layout from "./Layout";
import { DashboardUserContext } from "./Layout";
import { updatePersonalInformationAction } from "./Action";
import { User, Mail, Phone, Save, Upload, Camera } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const ProfileComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const userDetails = data.userDetails !== null ? data.userDetails : "";

  const [fData, setFdata] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    userImage: "",
    image: null, // New file object
    success: false,
  });

  useEffect(() => {
    setFdata({
      ...fData,
      id: userDetails._id,
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phoneNumber,
      userImage: userDetails.userImage,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const handleSubmit = () => {
    updatePersonalInformationAction(dispatch, fData);
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setFdata({
        ...fData,
        image: e.target.files[0],
        userImage: URL.createObjectURL(e.target.files[0]) // Preview
      });
    }
  }

  if (data.loading) {
    return (
      <div className="w-full md:w-9/12 flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-t-neon-blue border-gray-700 rounded-full animate-spin"></div>
        <span className="mt-4 text-gray-400">Loading Profile...</span>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:pl-8">
        <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden p-8">

          <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-white/5">
            <div className="p-3 bg-neon-blue/10 rounded-full">
              <User className="text-neon-blue" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-wide">Personal Information</h2>
              <p className="text-sm text-gray-400">Manage your profile details</p>
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

            {/* Profile Image Section */}
            <div className="flex items-center space-x-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-neon-blue/50 group">
                <img
                  src={fData.image ? fData.userImage : `${apiURL}/uploads/user/${fData.userImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"; }}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <label htmlFor="profileImage" className="cursor-pointer text-white">
                    <Camera size={24} />
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold">Profile Picture</h3>
                <p className="text-sm text-gray-400 mb-2">Upload a new avatar (JPG, PNG)</p>
                <label
                  htmlFor="profileImage"
                  className="inline-flex items-center space-x-2 text-xs bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg cursor-pointer transition-colors"
                >
                  <Upload size={14} />
                  <span>Upload New</span>
                </label>
              </div>
            </div>

            <div className="border-t border-white/5 my-4"></div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input
                  onChange={(e) => setFdata({ ...fData, name: e.target.value })}
                  value={fData.name}
                  type="text"
                  id="name"
                  className="w-full bg-black/20 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative group cursor-not-allowed">
                <Mail className="absolute left-4 top-3.5 text-gray-600" size={18} />
                <input
                  value={fData.email}
                  readOnly
                  type="email"
                  id="email"
                  className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-gray-500 cursor-not-allowed focus:outline-none"
                />
              </div>
              <span className="text-xs text-gray-600 pl-1">
                Note: Email address cannot be changed for security reasons.
              </span>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="number" className="text-sm font-medium text-gray-300">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 text-gray-500" size={18} />
                <input
                  onChange={(e) => setFdata({ ...fData, phone: e.target.value })}
                  value={fData.phone}
                  type="number"
                  id="number"
                  className="w-full bg-black/20 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                />
              </div>
            </div>

            <button
              onClick={(e) => handleSubmit()}
              className="w-full md:w-auto bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 mt-4"
            >
              <Save size={20} />
              <span>Update Information</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserProfile = (props) => {
  return (
    <Fragment>
      <Layout children={<ProfileComponent />} />
    </Fragment>
  );
};

export default UserProfile;
