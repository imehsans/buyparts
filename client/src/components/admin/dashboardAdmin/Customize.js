import React, { Fragment, useContext, useEffect } from "react";
import { DashboardContext } from "./";
import { uploadImage, sliderImages, deleteImage } from "./Action";
import { ImagePlus, X, Trash2, UploadCloud, Monitor } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const Customize = () => {
  const { data, dispatch } = useContext(DashboardContext);

  return (
    <Fragment>
      <div className="m-6 bg-dark-card border border-white/5 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-neon-purple/20 rounded-lg text-neon-purple">
              <Monitor size={24} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">Interface Customization</h2>
          </div>

          {!data.uploadSliderBtn && (
            <button
              onClick={(e) =>
                dispatch({
                  type: "uploadSliderBtn",
                  payload: !data.uploadSliderBtn,
                })
              }
              className="flex items-center space-x-2 px-4 py-2 bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20 border border-neon-blue/50 rounded-lg transition-all shadow-[0_0_10px_rgba(0,243,255,0.2)]"
            >
              <ImagePlus size={18} />
              <span className="font-semibold uppercase text-sm">Add Slide Module</span>
            </button>
          )}
        </div>

        {data.uploadSliderBtn && <UploadImageSection />}

        <AllImages />
      </div>
    </Fragment>
  );
};

const UploadImageSection = () => {
  const { data, dispatch } = useContext(DashboardContext);

  const uploadImageHandler = (image) => {
    uploadImage(image, dispatch);
  };

  return (
    <div className="mb-8 animate-fade-in-down bg-black/20 p-6 rounded-xl border border-dashed border-gray-600 hover:border-neon-blue transition-colors relative group">
      <button
        onClick={(e) =>
          dispatch({
            type: "uploadSliderBtn",
            payload: !data.uploadSliderBtn,
          })
        }
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-neon-blue/10 rounded-full text-neon-blue group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(0,243,255,0.3)]">
          <UploadCloud size={40} />
        </div>
        <div className="text-center">
          <h3 className="text-white font-medium">Upload Holo-Slide</h3>
          <p className="text-gray-500 text-sm mt-1">Drag and drop or click to upload high-res assets</p>
        </div>

        <div className="relative">
          <input
            onChange={(e) => uploadImageHandler(e.target.files[0])}
            name="image"
            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            type="file"
            id="image"
          />
          <button className="px-6 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold rounded-lg tracking-wide hover:shadow-[0_0_15px_rgba(188,19,254,0.5)] transition-shadow">
            Select File
          </button>
        </div>
      </div>
    </div>
  );
};

const AllImages = () => {
  const { data, dispatch } = useContext(DashboardContext);

  useEffect(() => {
    sliderImages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteImageReq = (id) => {
    deleteImage(id, dispatch);
  };

  return (
    <Fragment>
      {data.imageUpload && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.sliderImages.length > 0 ? (
          data.sliderImages.map((item, index) => {
            return (
              <div key={index} className="relative group rounded-xl overflow-hidden border border-white/10 hover:border-neon-blue/50 transition-all shadow-lg hover:shadow-neon-blue/20">
                <img
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  src={`${apiURL}/uploads/customize/${item.slideImage}`}
                  alt="sliderImages"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                  <button
                    onClick={(e) => deleteImageReq(item._id)}
                    className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 rounded-xl bg-white/5 border border-dashed border-gray-700">
              <div className="flex justify-center mb-3 text-gray-600">
                <ImagePlus size={48} opacity={0.5} />
              </div>
              <p className="text-gray-400 font-light text-lg">No active slide modules found in database.</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Customize;
