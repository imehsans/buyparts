import React, { Fragment, useContext, useState } from "react";
import { CategoryContext } from "./index";
import { createCategory, getAllCategory } from "./FetchApi";
import { X, UploadCloud, Save } from "lucide-react";

const AddCategoryModal = (props) => {
  const { data, dispatch } = useContext(CategoryContext);

  const alert = (msg, type) => (
    <div className={`py-4 px-6 w-full rounded-lg mb-4 flex items-center shadow-lg ${type === 'green' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
      <span className="font-medium mr-2">{type === 'green' ? 'Success:' : 'Error:'}</span> {msg}
    </div>
  );

  const [fData, setFdata] = useState({
    cName: "",
    cDescription: "",
    cImage: "",
    cStatus: "Active",
    cType: "Bike",
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      dispatch({
        type: "fetchCategoryAndChangeState",
        payload: responseData.Categories,
      });
    }
  };

  if (fData.error || fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, success: false, error: false });
    }, 2000);
  }

  const submitForm = async (e) => {
    dispatch({ type: "loading", payload: true });
    e.preventDefault();
    e.target.reset();

    if (!fData.cImage) {
      dispatch({ type: "loading", payload: false });
      return setFdata({ ...fData, error: "Please upload a category image" });
    }

    try {
      let responseData = await createCategory(fData);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          cName: "",
          cDescription: "",
          cImage: "",
          cStatus: "Active",
          success: responseData.success,
          error: false,
        });
        dispatch({ type: "loading", payload: false });
        setTimeout(() => {
          setFdata({
            ...fData,
            cName: "",
            cDescription: "",
            cImage: "",
            cStatus: "Active",
            success: false,
            error: false,
          });
        }, 2000);
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        dispatch({ type: "loading", payload: false });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "addCategoryModal", payload: false })}
        className={`${
          data.addCategoryModal ? "" : "hidden"
          } fixed top-0 left-0 z-40 w-full h-full bg-black/70 backdrop-blur-sm transition-opacity duration-300`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.addCategoryModal ? "" : "hidden"
          } fixed inset-0 m-4 flex items-center z-50 justify-center transition-opacity duration-300`}
      >
        <div className="relative bg-dark-card w-full md:w-3/6 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 rounded-2xl flex flex-col items-center space-y-4 overflow-y-auto max-h-screen px-4 py-8 md:px-8 animate-in zoom-in-95 duration-200">

          <div className="flex items-center justify-between w-full border-b border-white/10 pb-4">
            <span className="text-left font-bold text-2xl tracking-wide text-white">
              Add New Category
            </span>
            {/* Close Modal */}
            <span
              onClick={(e) =>
                dispatch({ type: "addCategoryModal", payload: false })
              }
              className="cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </span>
          </div>

          {fData.error ? alert(fData.error, "red") : ""}
          {fData.success ? alert(fData.success, "green") : ""}

          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex flex-col space-y-2 w-full py-4">
              <label htmlFor="name" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Category Name</label>
              <input
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cName: e.target.value,
                  })
                }
                value={fData.cName}
                className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white placeholder-gray-600 transition-all font-outfit"
                type="text"
                placeholder="e.g. Engine Parts"
              />
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label htmlFor="description" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Category Description</label>
              <textarea
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cDescription: e.target.value,
                  })
                }
                value={fData.cDescription}
                className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white placeholder-gray-600 transition-all font-outfit"
                name="description"
                id="description"
                cols={5}
                rows={4}
                placeholder="Short description..."
              />
            </div>

            {/* Image Field */}
            <div className="flex flex-col space-y-2 w-full mt-4">
              <label htmlFor="image" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Category Image</label>
              <div className="relative border-2 border-dashed border-gray-700 rounded-xl hover:border-neon-blue/50 transition-colors bg-black/20 p-6 flex flex-col items-center justify-center cursor-pointer group">
                <UploadCloud size={32} className="text-gray-500 group-hover:text-neon-blue transition-colors mb-2" />
                <span className="text-gray-500 text-sm group-hover:text-gray-300">Click to upload image</span>
                <input
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    setFdata({
                      ...fData,
                      success: false,
                      error: false,
                      cImage: e.target.files[0],
                    });
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  type="file"
                  id="image"
                />
              </div>
              {fData.cImage && <span className="text-xs text-neon-green mt-1 text-center">FILE SELECTED: {fData.cImage.name}</span>}
            </div>

            <div className="flex flex-col space-y-2 w-full mt-4">
              <label htmlFor="status" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Category Status</label>
              <select
                name="status"
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cStatus: e.target.value,
                  })
                }
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
                name="type"
                onChange={(e) =>
                  setFdata({
                    ...fData,
                    success: false,
                    error: false,
                    cType: e.target.value,
                  })
                }
                className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white transition-all font-outfit appearance-none"
                id="type"
                value={fData.cType}
              >
                <option value="Bike" className="bg-dark-card text-white">Bike</option>
                <option value="Car" className="bg-dark-card text-white">Car</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-8">
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg text-lg font-bold py-3 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all uppercase tracking-wider"
              >
                <Save size={20} />
                <span>Create Category</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCategoryModal;
