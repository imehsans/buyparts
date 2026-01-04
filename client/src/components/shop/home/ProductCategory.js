import React, { Fragment } from "react";

const CategoryCard = ({ icon, name }) => (
  <div className="flex flex-col items-center justify-center p-6 bg-brand-dark/50 border border-white/5 backdrop-blur-sm rounded-2xl hover:bg-brand-orange hover:border-brand-orange hover:shadow-[0_0_20px_rgba(253,126,20,0.4)] transition-all duration-300 cursor-pointer group w-40 h-40 mx-4 shrink-0">
    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 text-brand-orange group-hover:text-white">
      {icon}
    </div>
    <span className="text-gray-300 font-medium text-sm lg:text-base group-hover:text-white text-center">
      {name}
    </span>
  </div>
);

const ProductCategory = () => {
  // Static Categories for Demo - In real app, fetch from API
  const categories = [
    { id: 1, name: "Engines", icon: "⚙️" },
    { id: 2, name: "Lighting", icon: "💡" },
    { id: 3, name: "Wheels", icon: "🛞" },
    { id: 4, name: "Batteries", icon: "⚡" },
    { id: 5, name: "Interior", icon: "🛋️" },
    { id: 6, name: "Exhaust", icon: "💨" },
    { id: 7, name: "Brakes", icon: "🛑" },
    { id: 8, name: "Tools", icon: "🔧" },
  ];

  return (
    <Fragment>
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">EXPLORE BY <span className="text-brand-orange">CATEGORY</span></h2>
        <div className="w-16 h-1 bg-brand-orange rounded-full"></div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto pb-8 pt-4 px-4 hide-scrollbar justify-start md:justify-center">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} name={cat.name} icon={cat.icon} />
        ))}
      </div>
    </Fragment>
  );
};

export default ProductCategory;
