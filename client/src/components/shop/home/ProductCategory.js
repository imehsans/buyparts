import React, { Fragment, useState, useEffect } from "react";
import { getAllCategory } from "../../admin/categories/FetchApi";
import { Bike, Car } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const CategoryCard = ({ icon, name, image }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-brand-dark/50 border border-white/5 backdrop-blur-sm rounded-2xl hover:bg-brand-orange hover:border-brand-orange hover:shadow-[0_0_20px_rgba(253,126,20,0.4)] transition-all duration-300 cursor-pointer group w-36 h-36 md:w-40 md:h-40 mx-2 shrink-0">
    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 text-brand-orange group-hover:text-white w-16 h-16 flex items-center justify-center">
      {image ? (
        <img src={`${apiURL}/uploads/categories/${image}`} alt={name} className="w-full h-full object-contain filter drop-shadow-[0_0_5px_rgba(253,126,20,0.5)]" />
      ) : (
        icon
      )}
    </div>
    <span className="text-gray-300 font-medium text-xs md:text-sm group-hover:text-white text-center line-clamp-2">
      {name}
    </span>
  </div>
);

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState("Bike"); // "Bike" or "Car"

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await getAllCategory();
      if (responseData && responseData.Categories) {
        setCategories(responseData.Categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCategories = categories.filter(cat => {
    // Default to "Bike" if cType is missing for backward compatibility
    const type = cat.cType || "Bike";
    return type === activeTab;
  });

  return (
    <Fragment>
      <div className="flex flex-col items-center mb-6 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wide">
          Shop By <span className="text-brand-orange">Category</span>
        </h2>
        <div className="w-16 h-1 bg-brand-orange rounded-full mb-6"></div>

        {/* Tab Switcher */}
        <div className="flex bg-white/5 p-1 rounded-full border border-white/10 relative">
          {/* Slider Background */}
          <div
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-brand-orange rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(253,126,20,0.4)] ${activeTab === 'Bike' ? 'left-1' : 'left-[calc(50%+4px)]'}`}
          ></div>

          <button
            onClick={() => setActiveTab("Bike")}
            className={`relative z-10 flex items-center space-x-2 px-6 md:px-10 py-2 rounded-full font-bold uppercase text-sm md:text-base transition-colors duration-300 ${activeTab === 'Bike' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Bike size={20} />
            <span>Bikes</span>
          </button>
          <button
            onClick={() => setActiveTab("Car")}
            className={`relative z-10 flex items-center space-x-2 px-6 md:px-10 py-2 rounded-full font-bold uppercase text-sm md:text-base transition-colors duration-300 ${activeTab === 'Car' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Car size={20} />
            <span>Cars</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="w-full flex justify-center">
        <div className="flex overflow-x-auto pb-8 pt-4 px-4 hide-scrollbar w-full max-w-7xl justify-start md:justify-center">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((cat) => (
              <CategoryCard key={cat._id} name={cat.cName} image={cat.cImage} />
            ))
          ) : (
            <div className="text-gray-500 font-medium italic py-8">
              No categories found for {activeTab}s.
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCategory;
