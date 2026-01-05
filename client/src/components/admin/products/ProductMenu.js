import React, { Fragment, useContext } from "react";
import { ProductContext } from "./index";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import { PlusCircle, ShoppingBag } from "lucide-react";

const ProductMenu = (props) => {
  const { dispatch } = useContext(ProductContext);
  return (
    <Fragment>
      <div className="col-span-1 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-dark-card border border-white/5 p-4 rounded-xl shadow-lg backdrop-blur-sm">

          {/* Header Title */}
          <h2 className="text-xl font-bold text-white tracking-wide flex items-center">
            <span className="bg-neon-pink/10 p-2 rounded-lg mr-3 text-neon-pink border border-neon-pink/20">
              <ShoppingBag size={20} />
            </span>
            Product Inventory
          </h2>

          <div className="flex items-center space-x-4 w-full md:w-auto">
            {/* Add Button */}
            <button
              onClick={(e) =>
                dispatch({ type: "addProductModal", payload: true })
              }
              className="flex items-center justify-center space-x-2 px-6 py-2 bg-neon-pink/10 hover:bg-neon-pink/20 text-neon-pink border border-neon-pink/50 rounded-lg transition-all shadow-[0_0_15px_rgba(255,0,85,0.2)] hover:shadow-[0_0_25px_rgba(255,0,85,0.4)] font-medium uppercase tracking-wider text-sm w-full md:w-auto"
            >
              <PlusCircle size={18} />
              <span>Add Product</span>
            </button>
          </div>
        </div>
        <AddProductModal />
        <EditProductModal />
      </div>
    </Fragment>
  );
};

export default ProductMenu;
