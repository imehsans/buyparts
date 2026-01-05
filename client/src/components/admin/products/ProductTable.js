import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllProduct, deleteProduct } from "./FetchApi";
import moment from "moment";
import { ProductContext } from "./index";
import { Edit2, Trash2, Image as ImageIcon, Box } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const AllProduct = (props) => {
  const { data, dispatch } = useContext(ProductContext);
  const { products } = data;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
        setLoading(false);
      }
    }, 1000);
  };

  const deleteProductReq = async (pId) => {
    let deleteC = await deleteProduct(pId);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  };

  /* This method call the editmodal & dispatch product context */
  const editProduct = (pId, product, type) => {
    if (type) {
      dispatch({
        type: "editProductModalOpen",
        product: { ...product, pId: pId },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-pink shadow-[0_0_15px_#ff0055]"></div>
          <span className="text-neon-pink animate-pulse">Loading Inventory...</span>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="bg-dark-card border border-white/5 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm relative">
        {/* Decorative gradient line */}
        <div className="h-1 w-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue"></div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 uppercase tracking-wider font-semibold text-xs text-gray-300">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-center">Image</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-center">Category</th>
                <th className="px-6 py-4 text-center">Offer</th>
                <th className="px-6 py-4 text-center">Created At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products && products.length > 0 ? (
                products.map((item, key) => {
                  return (
                    <ProductTable
                      product={item}
                      editProduct={(pId, product, type) =>
                        editProduct(pId, product, type)
                      }
                      deleteProduct={(pId) => deleteProductReq(pId)}
                      key={key}
                    />
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="10"
                      className="px-6 py-12 text-center text-gray-500 italic"
                    >
                    No products found in inventory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/5 text-xs text-center text-gray-600 flex justify-between items-center px-6">
          <span>Inventory Status: Online</span>
          <span>{products && products.length} SKUs Listed</span>
        </div>
      </div>
    </Fragment>
  );
};

/* Single Product Component */
const ProductTable = ({ product, deleteProduct, editProduct }) => {
  return (
    <Fragment>
      <tr className="hover:bg-white/[0.02] transition-colors group">
        <td className="px-6 py-4 font-medium text-white">
          {product.pName.length > 15
            ? product.pName.substring(0, 15) + "..."
            : product.pName}
        </td>
        <td className="px-6 py-4">
          <span className="truncate max-w-xs block text-gray-500" title={product.pDescription}>
            {product.pDescription.slice(0, 15)}...
          </span>
        </td>
        <td className="px-6 py-4 text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-lg border border-white/10 overflow-hidden bg-white/5 relative group-hover:border-neon-pink/50 transition-colors">
              {product.pImages && product.pImages.length > 0 ? (
                <img
                  className="h-full w-full object-cover"
                  src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                  alt="pic"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-600">
                  <ImageIcon size={18} />
                </div>
              )}
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          {product.pStatus === "Active" ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
              {product.pStatus}
            </span>
          ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
              {product.pStatus}
            </span>
          )}
        </td>
        <td className="px-6 py-4 text-center font-mono text-white">
          <div className="flex items-center justify-center space-x-1">
            <Box size={14} className="text-gray-500" />
            <span>{product.pQuantity}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-center text-gray-400">
          {product.pCategory ? product.pCategory.cName : 'N/A'}
        </td>
        <td className="px-6 py-4 text-center text-neon-pink">
          {product.pOffer > 0 ? `${product.pOffer}%` : '-'}
        </td>
        <td className="px-6 py-4 text-center text-xs text-gray-500 font-mono">
          {moment(product.createdAt).format("MMM Do YY")}
        </td>
        <td className="px-6 py-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={(e) => editProduct(product._id, product, true)}
              className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 hover:text-blue-300 transition-colors border border-blue-500/20"
              title="Edit"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={(e) => deleteProduct(product._id)}
              className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 hover:text-red-300 transition-colors border border-red-500/20"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllProduct;
