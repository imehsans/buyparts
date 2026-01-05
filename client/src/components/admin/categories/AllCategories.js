import React, { Fragment, useContext, useEffect } from "react";
import { getAllCategory, deleteCategory } from "./FetchApi";
import { CategoryContext } from "./index";
import moment from "moment";
import { Edit2, Trash2, CheckCircle, XCircle, Image as ImageIcon } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const AllCategory = (props) => {
  const { data, dispatch } = useContext(CategoryContext);
  const { categories, loading } = data;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    let responseData = await getAllCategory();
    setTimeout(() => {
      if (responseData && responseData.Categories) {
        dispatch({
          type: "fetchCategoryAndChangeState",
          payload: responseData.Categories,
        });
        dispatch({ type: "loading", payload: false });
      }
    }, 1000);
  };

  const deleteCategoryReq = async (cId) => {
    let deleteC = await deleteCategory(cId);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  };

  /* This method call the editmodal & dispatch category context */
  const editCategory = (cId, type, des, status, cType) => {
    if (type) {
      dispatch({
        type: "editCategoryModalOpen",
        cId: cId,
        des: des,
        status: status,
        cType: cType,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue shadow-[0_0_15px_#00f3ff]"></div>
          <span className="text-neon-blue animate-pulse">Loading Categories...</span>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className=" bg-dark-card border border-white/5 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm relative">
        {/* Decorative gradient line */}
        <div className="h-1 w-full bg-gradient-to-r from-neon-purple via-neon-pink to-neon-orange"></div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 uppercase tracking-wider font-semibold text-xs text-gray-300">
              <tr>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-center">Image</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Created At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {categories && categories.length > 0 ? (
                categories.map((item, key) => {
                  return (
                    <CategoryTable
                      category={item}
                      editCat={(cId, type, des, status) =>
                        editCategory(cId, type, des, status)
                      }
                      deleteCat={(cId) => deleteCategoryReq(cId)}
                      key={key}
                    />
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                      className="px-6 py-12 text-center text-gray-500 italic"
                    >
                    No categories found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/5 text-xs text-center text-gray-600 flex justify-between items-center px-6">
          <span>Total Protocol: Secure</span>
          <span>{categories && categories.length} Categories Indexed</span>
        </div>
      </div>
    </Fragment>
  );
};

/* Single Category Component */
const CategoryTable = ({ category, deleteCat, editCat }) => {
  return (
    <Fragment>
      <tr className="hover:bg-white/[0.02] transition-colors group">
        <td className="px-6 py-4 font-bold text-white tracking-wide">
          {category.cName}
        </td>
        <td className="px-6 py-4">
          <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${category.cType === 'Bike' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
            {category.cType || "Bike"}
          </span>
        </td>
        <td className="px-6 py-4 max-w-xs truncate" title={category.cDescription}>
          {category.cDescription.length > 30
            ? category.cDescription.slice(0, 30) + "..."
            : category.cDescription}
        </td>
        <td className="px-6 py-4 text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-lg border border-white/10 overflow-hidden bg-white/5 relative group-hover:border-neon-blue/50 transition-colors">
              {category.cImage ? (
                <img
                  className="h-full w-full object-cover"
                  src={`${apiURL}/uploads/categories/${category.cImage}`}
                  alt={category.cName}
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
          {category.cStatus === "Active" ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
              {category.cStatus}
            </span>
          ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
              {category.cStatus}
            </span>
          )}
        </td>
        <td className="px-6 py-4 text-center text-xs text-gray-500 font-mono">
          {moment(category.createdAt).format("MMM Do YY")}
        </td>
        <td className="px-6 py-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <button
            onClick={(e) =>
              editCat(
                category._id,
                true,
                category.cDescription,
                category.cStatus,
                category.cType
              )
            }
              className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 hover:text-blue-300 transition-colors border border-blue-500/20"
              title="Edit"
          >
              <Edit2 size={16} />
            </button>
            <button
            onClick={(e) => deleteCat(category._id)}
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

export default AllCategory;
