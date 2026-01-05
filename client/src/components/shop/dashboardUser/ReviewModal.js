import React, { Fragment, useState, useEffect } from "react";
import { Star, X, MessageSquare, Send } from "lucide-react";
import axios from "axios";

const apiURL = import.meta.env.VITE_API_URL;

const ReviewModal = ({ isOpen, closeModal, order }) => {
  const [reviews, setReviews] = useState({}); // { productId: { rating: 5, review: "", status: "idle" } }
  
  useEffect(() => {
    if (order && order.allProduct) {
      let initialReviews = {};
      order.allProduct.forEach((item) => {
        initialReviews[item.id._id] = {
          rating: 5,
          review: "",
          status: "idle", // idle, submitting, success, error, existing
          message: "" 
        };
      });
      setReviews(initialReviews);
    }
  }, [order]);

  const handleRatingChange = (pId, rating) => {
    setReviews((prev) => ({
      ...prev,
      [pId]: { ...prev[pId], rating },
    }));
  };

  const handleReviewChange = (pId, text) => {
    setReviews((prev) => ({
      ...prev,
      [pId]: { ...prev[pId], review: text },
    }));
  };

  const submitReview = async (pId) => {
    const currentReview = reviews[pId];
    const uId = JSON.parse(localStorage.getItem("jwt")).user._id;
    
    setReviews((prev) => ({
      ...prev,
      [pId]: { ...prev[pId], status: "submitting" },
    }));

    try {
      let res = await axios.post(`${apiURL}/api/product/add-review`, {
        pId: pId,
        uId: uId,
        rating: currentReview.rating,
        review: currentReview.review,
      });

      if (res.data.success) {
         setReviews((prev) => ({
          ...prev,
          [pId]: { ...prev[pId], status: "success", message: "Review Submitted!" },
        }));
      } else if (res.data.error) {
         setReviews((prev) => ({
          ...prev,
          [pId]: { ...prev[pId], status: "error", message: res.data.error },
        }));
      }
    } catch (error) {
       setReviews((prev) => ({
          ...prev,
          [pId]: { ...prev[pId], status: "error", message: "Network Error" },
        }));
    }
  };

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={closeModal}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-dark-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="sticky top-0 z-10 bg-dark-card/95 backdrop-blur border-b border-white/10 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">Leave Feedback</h2>
            <p className="text-gray-400 text-sm">Rate your experience with the products</p>
          </div>
          <button 
            onClick={closeModal}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {order.allProduct.map((item, index) => {
            const product = item.id;
            const state = reviews[product._id] || { rating: 5, review: "", status: "idle" };

            return (
              <div key={index} className="bg-black/20 border border-white/5 rounded-xl p-4 md:p-6 transition-all">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Info */}
                  <div className="w-full md:w-1/4 flex flex-col items-center space-y-3">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/10 bg-white/5">
                      <img 
                        src={`${apiURL}/uploads/products/${product.pImages[0]}`} 
                        alt={product.pName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-center text-sm font-medium text-white line-clamp-2">{product.pName}</span>
                  </div>

                  {/* Review Form */}
                  <div className="w-full md:w-3/4 space-y-4">
                     {/* Star Rating */}
                     <div className="flex items-center space-x-2">
                        <span className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Rating:</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={24}
                              className={`cursor-pointer transition-transform hover:scale-110 ${
                                star <= state.rating
                                  ? "text-yellow-400 fill-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]"
                                  : "text-gray-600"
                              }`}
                              onClick={() => state.status !== "success" && handleRatingChange(product._id, star)}
                            />
                          ))}
                        </div>
                     </div>

                     {/* Review Text */}
                     <div className="relative">
                       <MessageSquare className="absolute left-3 top-3 text-gray-500" size={18} />
                       <textarea
                         className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all resize-none h-24 text-sm disabled:opacity-50"
                         placeholder="Write your review here..."
                         value={state.review}
                         onChange={(e) => handleReviewChange(product._id, e.target.value)}
                         disabled={state.status === "success" || state.status === "submitting"}
                       ></textarea>
                     </div>

                     {/* Action Button & Status */}
                     <div className="flex items-center justify-between">
                        <div className="text-sm">
                            {state.status === "success" && <span className="text-green-400 flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>{state.message}</span>}
                            {state.status === "error" && <span className="text-red-400 flex items-center"><span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>{state.message}</span>}
                        </div>

                        {state.status !== "success" && (
                            <button
                                onClick={() => submitReview(product._id)}
                                disabled={state.status === "submitting"}
                                className={`flex items-center space-x-2 px-6 py-2 rounded-lg font-bold text-sm uppercase tracking-wider transition-all
                                    ${state.status === "submitting" 
                                        ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                                        : "bg-neon-blue/10 text-neon-blue hover:bg-neon-blue hover:text-black border border-neon-blue/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                                    }
                                `}
                            >
                                {state.status === "submitting" ? (
                                    <span>Posting...</span>
                                ) : (
                                    <>
                                        <Send size={16} />
                                        <span>Post Review</span>
                                    </>
                                )}
                            </button>
                        )}
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
