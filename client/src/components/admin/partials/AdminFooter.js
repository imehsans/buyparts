import React, { Fragment } from "react";
import moment from "moment";

const AdminFooter = (props) => {
  return (
    <Fragment>
      <footer
        className="z-10 py-6 px-4 md:px-12 text-center text-xs text-gray-600 border-t border-gray-800 bg-dark"
      >
        <div className="flex justify-center items-center space-x-2">
          <span>BUYPARTS SYSTEM STATUS: <span className="text-neon-green">OPTIMAL</span></span>
          <span>|</span>
          <span>© {moment().format("YYYY")}</span>
        </div>
      </footer>
    </Fragment>
  );
};

export default AdminFooter;
