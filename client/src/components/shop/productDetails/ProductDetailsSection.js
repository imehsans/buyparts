import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsContext } from "./index";
import { LayoutContext } from "../layout";
import Submenu from "./Submenu";
import ProductDetailsSectionTwo from "./ProductDetailsSectionTwo";
import { getSingleProduct } from "./FetchApi";
import { cartListProduct } from "../partials/FetchApi";
import { isWishReq, unWishReq, isWish } from "../home/Mixins";
import { updateQuantity, slideImage, addToCart, cartList } from "./Mixins";
import { totalCost } from "../partials/Mixins";
import { Heart, ShoppingBag, Minus, Plus, ChevronLeft, ChevronRight, Star } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const ProductDetailsSection = (props) => {
  let { id } = useParams();
  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData, dispatch: layoutDispatch } = useContext(LayoutContext);

  const sProduct = layoutData.singleProductDetail;
  const [pImages, setPimages] = useState(null);
  const [count, setCount] = useState(0);
  const [quantitiy, setQuantitiy] = useState(1);
  const [, setAlertq] = useState(false);
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getSingleProduct(id);
      setTimeout(() => {
        if (responseData.Product) {
          layoutDispatch({
            type: "singleProductDetail",
            payload: responseData.Product,
          });
          setPimages(responseData.Product.pImages);
          dispatch({ type: "loading", payload: false });
          layoutDispatch({ type: "inCart", payload: cartList() });
        }
        if (responseData.error) {
          console.log(responseData.error);
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
    fetchCartProduct();
  };

  const fetchCartProduct = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        layoutDispatch({ type: "cartProduct", payload: responseData.Products });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue shadow-[0_0_15px_#00f3ff]"></div>
          <span className="text-neon-blue animate-pulse">Loading Product Data...</span>
        </div>
      </div>
    );
  } else if (!sProduct) {
    return <div className="text-center text-gray-400 py-20">Product Not Found</div>;
  }

  return (
    <Fragment>
      <Submenu
        value={{
          categoryId: sProduct.pCategory._id,
          product: sProduct.pName,
          category: sProduct.pCategory.cName,
        }}
      />
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="bg-dark-card border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">

            {/* Image Gallery Section */}
            <div className="relative p-6 md:p-10 bg-gradient-to-br from-black/40 to-black/10 flex flex-col justify-between min-h-[500px]">
              {/* Main Image */}
              <div className="relative flex-grow flex items-center justify-center group overflow-hidden rounded-2xl mb-6">
                <img
                  className="w-full max-h-[400px] object-contain object-center transition-transform duration-500 group-hover:scale-105"
                  src={`${apiURL}/uploads/products/${sProduct.pImages[count]}`}
                  alt={sProduct.pName}
                />

                {/* Navigation Arrows (visible on hover) */}
                <button
                  onClick={() => slideImage("increase", null, count, setCount, pImages)} // Note: slideImage logic handles logic, can just use simplified version if needed
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon-blue hover:text-black"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => slideImage("increase", null, count, setCount, pImages)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon-blue hover:text-black"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex justify-center space-x-4">
                {sProduct.pImages.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => slideImage("increase", index, count, setCount, pImages)}
                    className={`w-16 h-16 rounded-lg border-2 overflow-hidden cursor-pointer transition-all ${count === index ? 'border-neon-blue shadow-[0_0_10px_#00f3ff]' : 'border-gray-700 opacity-60 hover:opacity-100 hover:border-gray-500'}`}
                  >
                    <img src={`${apiURL}/uploads/products/${img}`} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="p-6 md:p-10 flex flex-col justify-center space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neon-blue text-sm font-bold uppercase tracking-widest border border-neon-blue/30 px-2 py-1 rounded">{sProduct.pCategory.cName}</span>
                  {/* Wishlist Toggle */}
                  <button
                    className="text-gray-400 hover:text-neon-pink transition-colors focus:outline-none"
                    onClick={(e) => isWish(sProduct._id, wList) ? unWishReq(e, sProduct._id, setWlist) : isWishReq(e, sProduct._id, setWlist)}
                  >
                    <Heart size={28} className={isWish(sProduct._id, wList) ? "fill-neon-pink text-neon-pink drop-shadow-[0_0_5px_#ff0055]" : ""} />
                  </button>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{sProduct.pName}</h1>

                {/* Rating Placeholder (can be dynamic if data exists) */}
                <div className="flex items-center space-x-2 text-yellow-500 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <span className="text-gray-400 text-sm">(0 Reviews)</span>
                </div>

                <p className="text-gray-400 leading-relaxed text-lg line-clamp-4">
                  {sProduct.pDescription}
                </p>
              </div>

              <div className="h-px bg-white/10 w-full my-4"></div>

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-gray-500 text-sm block mb-1">Price</span>
                  <span className="text-4xl font-bold text-neon-green">${sProduct.pPrice}.00</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-gray-500 text-sm block mb-2">Availability</span>
                  {sProduct.pQuantity > 0 ? (
                    <span className="text-neon-green flex items-center font-medium"><div className="w-2 h-2 bg-neon-green rounded-full mr-2"></div> In Stock</span>
                  ) : (
                    <span className="text-red-500 flex items-center font-medium"><div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div> Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                {/* Quantity Selector */}
                {sProduct.pQuantity > 0 && (
                  <div className="flex items-center bg-black/30 rounded-xl border border-white/10 p-1 w-full sm:w-auto">
                    <button
                      onClick={() => updateQuantity("decrease", sProduct.pQuantity, quantitiy, setQuantitiy, setAlertq)}
                      className="p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Minus size={18} />
                    </button>
                    <input
                      type="text"
                      className="bg-transparent text-center w-12 text-white font-bold focus:outline-none"
                      readOnly
                      value={quantitiy}
                    />
                    <button
                      onClick={() => updateQuantity("increase", sProduct.pQuantity, quantitiy, setQuantitiy, setAlertq)}
                      className="p-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                    )}

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    if (sProduct.pQuantity > 0 && (!layoutData.inCart || !layoutData.inCart.includes(sProduct._id))) {
                      addToCart(sProduct._id, quantitiy, sProduct.pPrice, layoutDispatch, setQuantitiy, setAlertq, fetchData, totalCost)
                    }
                  }}
                  disabled={sProduct.pQuantity === 0 || (layoutData.inCart && layoutData.inCart.includes(sProduct._id))}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-8 rounded-xl font-bold text-lg uppercase tracking-wide transition-all ${sProduct.pQuantity === 0 || (layoutData.inCart && layoutData.inCart.includes(sProduct._id))
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600'
                      : 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] hover:scale-[1.02] border border-white/20'
                    }`}
                >
                  <ShoppingBag size={20} />
                  <span>
                    {sProduct.pQuantity === 0 ? "Sold Out" :
                      (layoutData.inCart && layoutData.inCart.includes(sProduct._id) ? "Added to Cart" : "Add to Cart")}
                  </span>
                </button>
              </div>
              {sProduct.pQuantity > 0 && +quantitiy === +sProduct.pQuantity && <span className="text-red-400 text-xs text-center mt-1">Max quantity reached!</span>}

            </div>
          </div>
        </div>

        {/* Product Details Two Component */}
        <div className="mt-8">
          <ProductDetailsSectionTwo /> 
        </div>

      </section>
    </Fragment>
  );
};

export default ProductDetailsSection;
