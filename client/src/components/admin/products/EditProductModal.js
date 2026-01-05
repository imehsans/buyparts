import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { editProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";
import { X, Save, UploadCloud } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const EditProductModal = (props) => {
  const { data, dispatch } = useContext(ProductContext);

  const [categories, setCategories] = useState(null);

  const alert = (msg, type) => (
    <div className={`py-4 px-6 w-full rounded-lg mb-4 flex items-center shadow-lg ${type === 'green' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
      <span className="font-medium mr-2">{type === 'green' ? 'Success:' : 'Error:'}</span> {msg}
    </div>
  );

  const [editformData, setEditformdata] = useState({
    pId: "",
    pName: "",
    pDescription: "",
    pImages: null,
    pEditImages: null,
    pStatus: "",
    pCategory: "",
    pQuantity: "",
    pPrice: "",
    pOffer: "",
    error: false,
    success: false,
  });

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      setCategories(responseData.Categories);
    }
  };

  useEffect(() => {
    setEditformdata({
      pId: data.editProductModal.pId,
      pName: data.editProductModal.pName,
      pDescription: data.editProductModal.pDescription,
      pImages: data.editProductModal.pImages,
      pStatus: data.editProductModal.pStatus,
      pCategory: data.editProductModal.pCategory,
      pQuantity: data.editProductModal.pQuantity,
      pPrice: data.editProductModal.pPrice,
      pOffer: data.editProductModal.pOffer,
    });
  }, [data.editProductModal]);

  const fetchData = async () => {
    let responseData = await getAllProduct();
    if (responseData && responseData.Products) {
      dispatch({
        type: "fetchProductsAndChangeState",
        payload: responseData.Products,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!editformData.pEditImages) {
      console.log("Image Not upload=============", editformData);
    } else {
      console.log("Image uploading");
    }
    try {
      let responseData = await editProduct(editformData);
      if (responseData.success) {
        fetchData();
        setEditformdata({ ...editformData, success: responseData.success });
        setTimeout(() => {
          return setEditformdata({
            ...editformData,
            success: responseData.success,
          });
        }, 2000);
      } else if (responseData.error) {
        setEditformdata({ ...editformData, error: responseData.error });
        setTimeout(() => {
          return setEditformdata({
            ...editformData,
            error: responseData.error,
          });
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
        onClick={(e) =>
          dispatch({ type: "editProductModalClose", payload: false })
        }
        className={`${
          data.editProductModal.modal ? "" : "hidden"
          } fixed top-0 left-0 z-40 w-full h-full bg-black/70 backdrop-blur-sm transition-opacity duration-300`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.editProductModal.modal ? "" : "hidden"
          } fixed inset-0 flex items-center z-50 justify-center overflow-auto p-4`}
      >
        <div className="relative bg-dark-card w-full md:w-3/5 lg:w-2/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 rounded-2xl flex flex-col items-center space-y-4 px-4 py-8 md:px-8 animate-in zoom-in-95 duration-200 mt-20 md:mt-0">

          <div className="flex items-center justify-between w-full border-b border-white/10 pb-4">
            <span className="text-left font-bold text-2xl tracking-wide text-white">
              Edit Product
            </span>
            {/* Close Modal */}
            <span
              onClick={(e) =>
                dispatch({ type: "editProductModalClose", payload: false })
              }
              className="cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </span>
          </div>

          {editformData.error ? alert(editformData.error, "red") : ""}
          {editformData.success ? alert(editformData.success, "green") : ""}

          <form className="w-full" onSubmit={(e) => submitForm(e)}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 py-4">
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Product Name *</label>
                <input
                  value={editformData.pName}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pName: e.target.value,
                    })
                  }
                  className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink text-white placeholder-gray-600 transition-all font-outfit"
                  type="text"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <label htmlFor="price" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Product Price *</label>
                <input
                  value={editformData.pPrice}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pPrice: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink text-white placeholder-gray-600 transition-all font-outfit"
                  id="price"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Product Description *</label>
              <textarea
                value={editformData.pDescription}
                onChange={(e) =>
                  setEditformdata({
                    ...editformData,
                    error: false,
                    success: false,
                    pDescription: e.target.value,
                  })
                }
                className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink text-white placeholder-gray-600 transition-all font-outfit"
                name="description"
                id="description"
                cols={5}
                rows={3}
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col mt-4">
              <label htmlFor="image" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Product Images *</label>
              {editformData.pImages ? (
                <div className="flex space-x-2 mb-2">
                  <img
                    className="h-16 w-16 object-cover rounded border border-gray-700"
                    src={`${apiURL}/uploads/products/${editformData.pImages[0]}`}
                    alt="productImage"
                  />
                  {editformData.pImages[1] && (
                    <img
                      className="h-16 w-16 object-cover rounded border border-gray-700"
                      src={`${apiURL}/uploads/products/${editformData.pImages[1]}`}
                      alt="productImage"
                    />
                  )}
                </div>
              ) : (
                ""
              )}
              <span className="text-gray-500 text-xs mb-2">Must upload 2 images to replace existing ones</span>

              <div className="relative border-2 border-dashed border-gray-700 rounded-xl hover:border-neon-pink/50 transition-colors bg-black/20 p-6 flex flex-col items-center justify-center cursor-pointer group">
                <UploadCloud size={32} className="text-gray-500 group-hover:text-neon-pink transition-colors mb-2" />
                <span className="text-gray-500 text-sm group-hover:text-gray-300">Click to upload new images</span>
                <input
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pEditImages: [...e.target.files],
                    })
                  }
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="image"
                  multiple
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 py-4">
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <label htmlFor="status" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Product Status *</label>
                <select
                  value={editformData.pStatus}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pStatus: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink text-white transition-all font-outfit appearance-none"
                  id="status"
                >
                  <option name="status" value="Active" className="bg-dark-card text-white">
                    Active
                  </option>
                  <option name="status" value="Disabled" className="bg-dark-card text-white">
                    Disabled
                  </option>
                </select>
              </div>
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Product Category *</label>
                <select
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pCategory: e.target.value,
                    })
                  }
                  name="status"
                  className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink text-white transition-all font-outfit appearance-none"
                  id="status"
                >
                  <option disabled value="" className="bg-dark-card text-gray-400">
                    Select a category
                  </option>
                  {categories && categories.length > 0
                    ? categories.map((elem) => {
                        return (
                          <Fragment key={elem._id}>
                            {editformData.pCategory._id &&
                            editformData.pCategory._id === elem._id ? (
                              <option
                                name="status"
                                value={elem._id}
                                key={elem._id}
                                selected
                                  className="bg-dark-card text-white"
                              >
                                {elem.cName}
                              </option>
                            ) : (
                              <option
                                name="status"
                                value={elem._id}
                                key={elem._id}
                                  className="bg-dark-card text-white"
                              >
                                {elem.cName}
                              </option>
                            )}
                          </Fragment>
                        );
                      })
                    : ""}
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 py-4">
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Product in Stock *</label>
                <input
                  value={editformData.pQuantity}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pQuantity: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink text-white placeholder-gray-600 transition-all font-outfit"
                  id="quantity"
                />
              </div>
              <div className="w-full md:w-1/2 flex flex-col space-y-2">
                <label htmlFor="offer" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Product Offer (%) *</label>
                <input
                  value={editformData.pOffer}
                  onChange={(e) =>
                    setEditformdata({
                      ...editformData,
                      error: false,
                      success: false,
                      pOffer: e.target.value,
                    })
                  }
                  type="number"
                  className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-pink focus:ring-1 focus:ring-neon-pink text-white placeholder-gray-600 transition-all font-outfit"
                  id="offer"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-4">
              <button
                type="submit"
                className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-neon-pink to-neon-purple text-white rounded-lg text-lg font-bold py-3 hover:shadow-[0_0_20px_rgba(255,0,85,0.4)] transition-all uppercase tracking-wider"
              >
                <Save size={20} />
                <span>Update Product</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProductModal;
