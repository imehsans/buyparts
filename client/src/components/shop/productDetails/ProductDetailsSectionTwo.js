import React, { Fragment, useContext, useEffect, useState } from "react";
import AllReviews from "./AllReviews";
import ReviewForm from "./ReviewForm";
import { ProductDetailsContext } from "./";
import { LayoutContext } from "../layout";
import { isAuthenticate } from "../auth/fetchApi";
import { AlignLeft, MessageSquare } from "lucide-react";

import "./style.css";

const Menu = () => {
  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData } = useContext(LayoutContext);

  return (
    <Fragment>
      <div className="flex items-center space-x-8 mb-8 border-b border-white/10 pb-1">
        <div
          onClick={(e) => dispatch({ type: "menu", payload: true })}
          className={`pb-3 px-2 flex items-center cursor-pointer transition-all duration-300 text-lg font-medium tracking-wide ${data.menu ? "border-b-2 border-neon-blue text-neon-blue" : "text-gray-400 hover:text-white border-b-2 border-transparent"
            }`}
        >
          <AlignLeft size={18} className="mr-2" />
          Description
        </div>
        <div
          onClick={(e) => dispatch({ type: "menu", payload: false })}
          className={`pb-3 px-2 flex items-center cursor-pointer transition-all duration-300 text-lg font-medium tracking-wide relative ${!data.menu ? "border-b-2 border-neon-blue text-neon-blue" : "text-gray-400 hover:text-white border-b-2 border-transparent"
            }`}
        >
          <MessageSquare size={18} className="mr-2" />
          <span>Reviews</span>
          <span className="ml-2 bg-white/10 text-white text-xs py-0.5 px-2 rounded-full border border-white/5">
            {layoutData.singleProductDetail.pRatingsReviews.length}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

const RatingReview = () => {
  return (
    <Fragment>
      <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
        <AllReviews />
        {isAuthenticate() ? (
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">Write a Review</h3>
            <ReviewForm />
          </div>
        ) : (
          <div className="mt-8 p-4 bg-neon-orange/10 border border-neon-orange/30 rounded-lg text-neon-orange text-center">
            Please login to write a review.
          </div>
        )}
      </div>
    </Fragment>
  );
};

const ProductDetailsSectionTwo = (props) => {
  const { data } = useContext(ProductDetailsContext);
  const { data: layoutData } = useContext(LayoutContext);
  const [singleProduct, setSingleproduct] = useState({});

  useEffect(() => {
    setSingleproduct(
      layoutData.singleProductDetail ? layoutData.singleProductDetail : ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <section className="bg-dark-card border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm p-6 md:p-10">
        <Menu />

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {data.menu ? (
            <div className="text-gray-300 leading-relaxed space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Product Specifications</h3>
              <p>{singleProduct.pDescription}</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                  <span className="text-gray-500 text-sm block">Category</span>
                  <span className="text-neon-blue font-medium">{singleProduct.pCategory ? singleProduct.pCategory.cName : "N/A"}</span>
                </div>
                <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                  <span className="text-gray-500 text-sm block">Condition</span>
                  <span className="text-white font-medium">New</span>
                </div>
              </div>
            </div>
          ) : (
            <RatingReview />
          )}
        </div>
      </section>
    </Fragment>
  );
};

export default ProductDetailsSectionTwo;
