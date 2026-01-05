import React, { Fragment } from "react";

import AdminNavber from "../partials/AdminNavber";
import AdminSidebar from "../partials/AdminSidebar";
import AdminFooter from "../partials/AdminFooter";

const AdminLayout = ({ children }) => {
  return (
    <Fragment>
      <div className="min-h-screen bg-dark text-gray-100 font-outfit selection:bg-neon-blue selection:text-black">
        <AdminNavber />
        <section className="flex relative items-start">
          <AdminSidebar />
          <div className="w-full md:w-9/12 lg:w-10/12 min-h-[calc(100vh-80px)] p-6 overflow-x-hidden">
            {/* All Children pass from here */}
            {children}
          </div>
        </section>
        <AdminFooter />
      </div>
    </Fragment>
  );
};

export default AdminLayout;
