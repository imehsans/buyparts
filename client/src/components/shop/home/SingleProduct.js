import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isWishReq, unWishReq, isWish } from "./Mixins";

const apiURL = import.meta.env.VITE_API_URL;

const SingleProduct = ({ products, title, tagline }) => {
  const navigate = useNavigate();
  /* WishList State - Initialized from local storage */
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  return (
    <Fragment>
      <section className="mx-4 md:mx-12 my-16">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 text-center space-y-3">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg">
            {title}
          </h2>
          <div className="h-1 w-24 bg-brand-orange rounded-full shadow-[0_0_10px_#fd7e14]"></div>
          {tagline && (
            <p className="text-brand-orange uppercase tracking-[0.3em] text-sm font-bold animate-pulse">
              {tagline}
            </p>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products && products.length > 0 ? (
            products.map((item, index) => (
              <div
                key={index}
                className="group relative bg-brand-dark border border-white/5 rounded-2xl overflow-hidden hover:border-brand-orange transition-all duration-500 hover:shadow-[0_0_30px_rgba(253,126,20,0.2)] flex flex-col hover:-translate-y-2"
              >

                {/* Image Area */}
                <div
                  className="relative aspect-[4/5] overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/products/${item._id}`)}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80 z-10"></div>

                  <img
                    src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                    alt={item.pName}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Sale Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-brand-orange text-white text-xs font-black px-3 py-1 rounded-sm uppercase tracking-wider shadow-lg">Sale</span>
                  </div>

                  {/* Wishlist Button */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <div className="flex flex-col space-y-2">
                      {/* Heart Icon */}
                      <div className="bg-slate-900/80 backdrop-blur-md p-2 rounded-full hover:bg-white hover:text-brand-orange text-white transition-all cursor-pointer shadow-xl border border-white/10">
                        <svg
                          onClick={(e) => { e.stopPropagation(); isWishReq(e, item._id, setWlist); }}
                          className={`${isWish(item._id, wList) && "hidden"} w-5 h-5`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <svg
                          onClick={(e) => { e.stopPropagation(); unWishReq(e, item._id, setWlist); }}
                          className={`${!isWish(item._id, wList) && "hidden"} w-5 h-5 text-red-500 fill-current`}
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow relative z-20 bg-white/5 backdrop-blur-sm group-hover:bg-white/10 transition-colors">
                  <div className="mb-2">
                    <h3
                      className="text-lg font-bold text-gray-100 mb-1 truncate cursor-pointer hover:text-brand-orange transition-colors"
                      onClick={() => navigate(`/products/${item._id}`)}
                    >
                      {item.pName}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs ${i < item.pRatingsReviews.length ? 'text-brand-orange' : 'text-gray-600'}`}>★</span>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({item.pRatingsReviews.length})</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs text-brand-orange uppercase font-bold tracking-wider">Price</span>
                      <span className="text-2xl font-black text-white">${item.pPrice}.00</span>
                    </div>
                    <button
                      onClick={() => navigate(`/products/${item._id}`)}
                      className="bg-white/10 hover:bg-brand-orange text-white p-3 rounded-xl transition-all shadow-lg hover:shadow-brand-orange/50"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 flex flex-col items-center justify-center space-y-4 opacity-50">
              <div className="w-16 h-16 border-4 border-t-brand-orange border-gray-700 rounded-full animate-spin"></div>
              <p className="text-gray-400 font-light tracking-widest">LOADING FUTURE INVENTORY...</p>
            </div>
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default SingleProduct;
