import React, { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../index";
import { cartListProduct } from "./FetchApi";
import { isAuthenticate } from "../auth/fetchApi";
import { cartList } from "../productDetails/Mixins";
import { subTotal, quantity, totalCost } from "./Mixins";
import { X, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const CartModal = () => {
  const navigate = useNavigate();

  const { data, dispatch } = useContext(LayoutContext);
  const products = data.cartProduct;

  const cartModalOpen = () =>
    dispatch({ type: "cartModalToggle", payload: !data.cartModal });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "cartTotalCost", payload: totalCost() });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartProduct = (id) => {
    let cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cart.length !== 0) {
      cart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      fetchData();
      dispatch({ type: "inCart", payload: cartList() });
      dispatch({ type: "cartTotalCost", payload: totalCost() });
    }
    if (cart.length === 0) {
      dispatch({ type: "cartProduct", payload: null });
      fetchData();
      dispatch({ type: "inCart", payload: cartList() });
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        className={`${
          !data.cartModal ? "hidden" : ""
          } fixed top-0 left-0 z-40 w-full h-full bg-black/80 backdrop-blur-sm transition-opacity duration-300`}
        onClick={cartModalOpen}
      />
      {/* Cart Modal Start */}
      <section
        className={`${
          !data.cartModal ? "translate-x-full" : "translate-x-0"
          } fixed z-50 top-0 right-0 h-full w-full md:w-[400px] bg-dark-card border-l border-white/10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="text-neon-blue" size={24} />
            <span className="text-xl font-bold text-white tracking-wide">Your Cart</span>
            <span className="bg-white/10 text-xs px-2 py-1 rounded-full text-gray-300 font-mono">
              {products ? products.length : 0}
            </span>
          </div>
          <button
            onClick={cartModalOpen}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {products && products.length > 0 ? (
            products.map((item, index) => (
              <div key={index} className="flex gap-4 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors group relative">
                {/* Remove Button */}
                <button
                  onClick={() => removeCartProduct(item._id)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                  title="Remove Item"
                >
                  <Trash2 size={16} />
                </button>

                <div className="w-20 h-20 flex-shrink-0 bg-black/20 rounded-lg overflow-hidden border border-white/5">
                  <img
                          className="w-full h-full object-cover object-center"
                          src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                          alt="cartProduct"
                        />
                      </div>

                      <div className="flex flex-col justify-center flex-1 pr-6">
                        <h4 className="text-white font-medium text-sm line-clamp-2 mb-1">{item.pName}</h4>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center space-x-2 bg-black/20 px-2 py-1 rounded">
                            <span>Qty:</span>
                            <span className="text-neon-blue font-bold">{quantity(item._id)}</span>
                          </div>
                          <div className="font-mono text-neon-green">
                            ${subTotal(item._id, item.pPrice)}.00
                          </div>
                        </div>
                      </div>
                      </div>
                  ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingBag size={48} className="text-gray-600" />
              <p className="text-gray-400 font-light">Your cart is currently empty.</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400 text-sm uppercase tracking-wider">Subtotal</span>
            <span className="text-2xl font-bold text-white">${data.cartTotalCost}.00</span>
          </div>

          <div className="space-y-3">
            {data.cartTotalCost ? (
              <button
                onClick={() => {
                  navigate(isAuthenticate() ? "/checkout" : "/");
                  cartModalOpen();
                  if (!isAuthenticate()) {
                    dispatch({ type: "loginSignupModalToggle", payload: true });
                  }
                }}
                className="w-full py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
                <button disabled className="w-full py-3 bg-gray-800 text-gray-500 font-bold rounded-lg cursor-not-allowed">
                  Checkout
              </button>
            )}

            <button
              onClick={cartModalOpen}
              className="w-full py-3 bg-transparent border border-white/10 hover:bg-white/5 text-gray-300 font-medium rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CartModal;
