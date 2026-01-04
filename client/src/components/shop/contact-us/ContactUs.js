import React, { Fragment, useState } from "react";
import Layout from "../layout";
import { useSnackbar } from "notistack";

const ContactComponent = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate functionality
    console.log("Contact Form Data:", data);
    enqueueSnackbar("Message sent successfully (Simulation)", { variant: "success" });
    setData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-10 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto glass-panel p-8 rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT COLUMN - CONTACT INFO */}
          <div className="space-y-10">
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-widest text-shadow-neon">CONTACT US.</h2>

            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="border border-white/20 rounded p-3 group-hover:border-brand-orange group-hover:shadow-[0_0_15px_rgba(253,126,20,0.5)] transition-all duration-300">
                    <svg className="h-6 w-6 text-gray-400 group-hover:text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide">CALL US</h4>
                  <p className="mt-1 text-white font-medium">(+92) 3237112012</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="border border-white/20 rounded p-3 group-hover:border-brand-orange group-hover:shadow-[0_0_15px_rgba(253,126,20,0.5)] transition-all duration-300">
                    <svg className="h-6 w-6 text-gray-400 group-hover:text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide">EMAIL ADDRESS:</h4>
                  <p className="mt-1 text-white font-medium">dndstores.pk@gmail.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="border border-white/20 rounded p-3 group-hover:border-brand-orange group-hover:shadow-[0_0_15px_rgba(253,126,20,0.5)] transition-all duration-300">
                    <svg className="h-6 w-6 text-gray-400 group-hover:text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 11.955 11.955 0 01-5.855-5.855l-4.243-4.244a1.998 1.998 0 010-2.827L7.5 4.5 11 8l-3.5 3.5L12 16l4.5-4.5L20 8l3.5 3.5-3.5 3.5a1.998 1.998 0 01-2.828 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide">STORE LOCATION</h4>
                  <p className="mt-1 text-white font-medium w-64">
                    Shop No: 06, 1st Floor, Rehamt Plaza, Main I10 Markaz, Islamabad
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start group">
                <div className="flex-shrink-0">
                  <div className="border border-white/20 rounded p-3 group-hover:border-brand-orange group-hover:shadow-[0_0_15px_rgba(253,126,20,0.5)] transition-all duration-300">
                    <svg className="h-6 w-6 text-gray-400 group-hover:text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wide">TIME:</h4>
                  <p className="mt-1 text-white font-medium">24/7 Customer Support</p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-3 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-brand-orange/90 flex items-center justify-center cursor-pointer hover:bg-brand-orange hover:shadow-[0_0_15px_rgba(253,126,20,0.6)] transition-all duration-300">
                    <span className="text-black font-bold text-sm">social</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN - FORM */}
          <div className="space-y-10">
            <h2 className="text-3xl font-extrabold text-white uppercase tracking-widest text-shadow-neon">GET IN TOUCH.</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-1">
                    Name <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded focus:border-brand-orange focus:shadow-[0_0_10px_rgba(253,126,20,0.3)] outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-1">
                    Email <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded focus:border-brand-orange focus:shadow-[0_0_10px_rgba(253,126,20,0.3)] outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-bold text-gray-300 mb-1">
                  Subject <span className="text-brand-orange">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={data.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded focus:border-brand-orange focus:shadow-[0_0_10px_rgba(253,126,20,0.3)] outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-gray-300 mb-1">
                  Your Message <span className="text-brand-orange">*</span>
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="6"
                  value={data.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded focus:border-brand-orange focus:shadow-[0_0_10px_rgba(253,126,20,0.3)] outline-none transition-all"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-brand-orange text-black font-bold py-3 px-8 uppercase hover:bg-orange-600 hover:text-white hover:shadow-[0_0_20px_rgba(253,126,20,0.6)] transition duration-300 text-sm tracking-wider rounded"
                >
                  Submit Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactUs = (props) => {
  return (
    <Fragment>
      <Layout children={<ContactComponent />} />
    </Fragment>
  );
};

export default ContactUs;
