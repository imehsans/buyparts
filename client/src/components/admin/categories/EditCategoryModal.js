import React, { Fragment, useContext, useState, useEffect } from "react";
import { CategoryContext } from "./index";
import { editCategory, getAllCategory } from "./FetchApi";
import { X, Save } from "lucide-react";

const EditCategoryModal = (props) => {
  const { data, dispatch } = useContext(CategoryContext);

  const [des, setDes] = useState("");
  const [status, setStatus] = useState("");
  const [cId, setCid] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setDes(data.editCategoryModal.des);
    setStatus(data.editCategoryModal.status);
    setCid(data.editCategoryModal.cId);
    setType(data.editCategoryModal.cType || "Bike");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.editCategoryModal.modal]);

  const fetchData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      dispatch({
        type: "fetchCategoryAndChangeState",
        payload: responseData.Categories,
      });
    }
  };

  const submitForm = async () => {
    dispatch({ type: "loading", payload: true });
    let edit = await editCategory(cId, des, status, type);
    if (edit.error) {
      console.log(edit.error);
      dispatch({ type: "loading", payload: false });
    } else if (edit.success) {
      console.log(edit.success);
      dispatch({ type: "editCategoryModalClose" });
      setTimeout(() => {
        fetchData();
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "editCategoryModalClose" })}
        className={`${
          data.editCategoryModal.modal ? "" : "hidden"
          } fixed top-0 left-0 z-40 w-full h-full bg-black/70 backdrop-blur-sm transition-opacity duration-300`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.editCategoryModal.modal ? "" : "hidden"
          } fixed inset-0 m-4 flex items-center z-50 justify-center transition-opacity duration-300`}
      >
        <div className="relative bg-dark-card w-full md:w-3/6 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 rounded-2xl flex flex-col items-center space-y-4 overflow-y-auto px-4 py-8 md:px-8 animate-in zoom-in-95 duration-200">

          <div className="flex items-center justify-between w-full border-b border-white/10 pb-4">
            <span className="text-left font-bold text-2xl tracking-wide text-white">
              Edit Category
            </span>
            {/* Close Modal */}
            <span
              onClick={(e) => dispatch({ type: "editCategoryModalClose" })}
              className="cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </span>
          </div>

          <div className="flex flex-col space-y-2 w-full mt-4">
            <label htmlFor="description" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Category Description</label>
            <textarea
              value={des}
              onChange={(e) => setDes(e.target.value)}
              className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white placeholder-gray-600 transition-all font-outfit"
              name="description"
              id="description"
              cols={5}
              rows={5}
            />
          </div>
          <div className="flex flex-col space-y-2 w-full mt-4">
            <label htmlFor="status" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Category Status</label>
            <select
              value={status}
              name="status"
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white transition-all font-outfit appearance-none"
              id="status"
            >
              <option value="Active" className="bg-dark-card text-white">Active</option>
              <option value="Disabled" className="bg-dark-card text-white">Disabled</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2 w-full mt-4">
            <label htmlFor="type" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Category Type</label>
            <select
              value={type}
              name="type"
              onChange={(e) => setType(e.target.value)}
              className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white transition-all font-outfit appearance-none"
              id="type"
            >
              <option value="Bike" className="bg-dark-card text-white">Bike</option>
              <option value="Car" className="bg-dark-card text-white">Car</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-8">
            <button
              onClick={(e) => submitForm()}
              className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg text-lg font-bold py-3 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all uppercase tracking-wider"
            >
              <Save size={20} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditCategoryModal;
