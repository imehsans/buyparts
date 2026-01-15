import React, { Fragment } from "react";
import moment from "moment";

const Footer = (props) => {

  return (
    <Fragment>
      <footer className="z-10 py-2 px-4 md:px-12 text-center glass-panel mt-auto border-t border-white/5">
        <p className="text-sm text-gray-400 font-light tracking-wider">
          <span className="font-bold text-brand-orange">Buy Parts</span> &copy; {moment().format("YYYY")} All Rights Reserved.
        </p>
      </footer>
    </Fragment>
  );
};

export default Footer;
