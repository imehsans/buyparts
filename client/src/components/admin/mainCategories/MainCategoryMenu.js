import React, { Fragment, useContext } from "react";
import { MainCategoryContext } from "./index";
import AddMainCategoryModal from "./AddMainCategoryModal";
import EditMainCategoryModal from "./EditMainCategoryModal";
import { PlusCircle, Search } from "lucide-react";

const MainCategoryMenu = (props) => {
  const { dispatch } = useContext(MainCategoryContext);

  return (
    <Fragment>
      <div className="col-span-1 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-dark-card border border-white/5 p-4 rounded-xl shadow-lg backdrop-blur-sm">

          {/* Header Title */}
          <h2 className="text-xl font-bold text-white tracking-wide flex items-center">
            <span className="bg-neon-orange/10 p-2 rounded-lg mr-3 text-neon-orange border border-neon-orange/20">
              <PlusCircle size={20} />
            </span>
            Main Category Management
          </h2>

          <div className="flex items-center space-x-4 w-full md:w-auto">
            {/* Search box placeholder for future implementation */}
            <div className="relative group hidden md:block">
              <input
                type="text"
                placeholder="Search main categories..."
                className="pl-9 pr-4 py-2 bg-black/20 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:border-neon-orange focus:ring-1 focus:ring-neon-orange transition-all w-64"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-500 group-focus-within:text-neon-orange transition-colors" />
            </div>

            {/* Add Button */}
            <button
              onClick={(e) =>
                dispatch({ type: "addMainCategoryModal", payload: true })
              }
              className="flex items-center justify-center space-x-2 px-6 py-2 bg-neon-orange/10 hover:bg-neon-orange/20 text-neon-orange border border-neon-orange/50 rounded-lg transition-all shadow-[0_0_15px_rgba(253,126,20,0.2)] hover:shadow-[0_0_25px_rgba(253,126,20,0.4)] font-medium uppercase tracking-wider text-sm w-full md:w-auto"
            >
              <PlusCircle size={18} />
              <span>Add Main Category</span>
            </button>
          </div>
        </div>

        <AddMainCategoryModal />
        <EditMainCategoryModal />
      </div>
    </Fragment>
  );
};

export default MainCategoryMenu;
