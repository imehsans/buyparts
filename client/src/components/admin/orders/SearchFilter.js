import React, { Fragment } from "react";
import { Search } from "lucide-react";

const SearchFilter = (props) => {
  return (
    <Fragment>
      <div className="relative group rounded-lg transition-all duration-300">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray-500 group-focus-within:text-neon-blue transition-colors" />
        </div>
        <input
          placeholder="Search Transaction ID..."
          className="pl-10 pr-4 py-2 bg-black/20 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all w-64 md:w-80"
          type="text"
        />
      </div>
    </Fragment>
  );
};

export default SearchFilter;
