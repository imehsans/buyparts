import React, { Fragment, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";

import { cartListProduct } from "../partials/FetchApi";
import { getBrainTreeToken, getPaymentProcess } from "./FetchApi";
import { fetchData, fetchbrainTree, pay, placeOrder } from "./Action";
import { getPaymentSettings } from "../../admin/payment/FetchApi"; // Re-use fetch api
import DropIn from "braintree-web-drop-in-react";
import { MapPin, Phone, CreditCard, ShoppingBag, Truck, Package, ShieldCheck, Smartphone, Banknote, Upload } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

export const CheckoutComponent = (props) => {
  const navigate = useNavigate();
  const { data, dispatch } = useContext(LayoutContext);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
    clientToken: null,
    instance: {},
  });

  const [paymentMethod, setPaymentMethod] = useState("Card"); // Card, COD, EasyPaisa, JazzCash
  const [manualTransactionId, setManualTransactionId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null); // New state for file
  const [paymentSettings, setPaymentSettings] = useState({
    easyPaisaName: "Admin",
    easyPaisaNumber: "0000-0000000",
    jazzCashName: "Admin",
    jazzCashNumber: "0000-0000000",
  });

  useEffect(() => {
    fetchData(cartListProduct, dispatch);
    fetchbrainTree(getBrainTreeToken, setState);
    fetchPaymentSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPaymentSettings = async () => {
    let res = await getPaymentSettings();
    if (res && res.settings) {
      setPaymentSettings(res.settings);
    }
  }

  if (data.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-16 h-16 border-4 border-t-neon-blue border-gray-700 rounded-full animate-spin"></div>
        <span className="text-gray-400 font-medium animate-pulse">Processing Secure Checkout...</span>
      </div>
    );
  }

  const handlePay = () => {
    if (paymentMethod === "Card") {
      pay(data, dispatch, state, setState, getPaymentProcess, totalCost, navigate);
    } else {
      placeOrder(data, dispatch, state, setState, totalCost, navigate, paymentMethod, manualTransactionId, paymentScreenshot);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setPaymentScreenshot(e.target.files[0]);
    }
  }

  return (
    <Fragment>
      <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24 mb-12">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-neon-blue/10 rounded-full border border-neon-blue/20">
            <ShieldCheck className="text-neon-blue" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase">Checkout</h1>
            <p className="text-gray-400 text-sm">Select Payment Method and Complete Order</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Left Column: Product List */}
          <div className="w-full lg:w-3/5 mb-8 lg:mb-0">
            <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden p-6 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
              <div className="flex items-center space-x-2 mb-6 text-xl font-bold text-white border-b border-white/5 pb-4">
                <ShoppingBag className="text-neon-purple" />
                <span>Order Summary</span>
              </div>
              <CheckoutProducts products={data.cartProduct} />
            </div>
          </div>

          {/* Right Column: Payment & Address */}
          <div className="w-full lg:w-2/5">
            <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden p-6 sticky top-24">
              {state.clientToken !== null || paymentMethod !== "Card" ? (
                <Fragment>
                  <div
                    onBlur={(e) => setState({ ...state, error: false })}
                    className="flex flex-col space-y-6"
                  >
                    {state.error ? (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center shadow-lg shadow-red-500/10">
                        {state.error}
                      </div>
                    ) : null}

                    {/* Delivery Info */}
                    <div className="space-y-4">
                      <h3 className="text-white font-bold flex items-center space-x-2">
                        <Truck size={18} className="text-neon-green" />
                        <span>Delivery Information</span>
                      </h3>

                      <div className="relative group">
                        <MapPin className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-blue transition-colors" size={18} />
                        <input
                          value={state.address}
                          onChange={(e) =>
                            setState({
                              ...state,
                              address: e.target.value,
                              error: false,
                            })
                          }
                          type="text"
                          id="address"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all placeholder-gray-600"
                          placeholder="Enter your delivery address..."
                        />
                      </div>

                      <div className="relative group">
                        <Phone className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-neon-blue transition-colors" size={18} />
                        <input
                          value={state.phone}
                          onChange={(e) =>
                            setState({
                              ...state,
                              phone: e.target.value,
                              error: false,
                            })
                          }
                          type="number"
                          id="phone"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all placeholder-gray-600"
                          placeholder="Enter phone number..."
                        />
                      </div>
                    </div>

                    <div className="border-t border-white/10 my-4"></div>

                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                      <h3 className="text-white font-bold flex items-center space-x-2">
                        <CreditCard size={18} className="text-brand-orange" />
                        <span>Select Payment Method</span>
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        <div
                          onClick={() => setPaymentMethod("Card")}
                          className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "Card" ? "bg-brand-orange text-white border-brand-orange shadow-[0_0_15px_rgba(253,126,20,0.4)]" : "bg-black/20 text-gray-400 border-white/10 hover:border-white/30"}`}
                        >
                          <CreditCard size={24} />
                          <span className="text-xs font-bold text-center">Stripe / Card</span>
                        </div>
                        <div
                          onClick={() => setPaymentMethod("COD")}
                          className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "COD" ? "bg-neon-green text-black border-neon-green shadow-[0_0_15px_rgba(10,255,104,0.4)]" : "bg-black/20 text-gray-400 border-white/10 hover:border-white/30"}`}
                        >
                          <Truck size={24} />
                          <span className="text-xs font-bold text-center">Cash On Delivery</span>
                        </div>
                        <div
                          onClick={() => setPaymentMethod("EasyPaisa")}
                          className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "EasyPaisa" ? "bg-green-600 text-white border-green-600 shadow-[0_0_15px_rgba(22,163,74,0.4)]" : "bg-black/20 text-gray-400 border-white/10 hover:border-white/30"}`}
                        >
                          <Smartphone size={24} />
                          <span className="text-xs font-bold text-center">EasyPaisa</span>
                        </div>
                        <div
                          onClick={() => setPaymentMethod("JazzCash")}
                          className={`cursor-pointer p-4 rounded-xl border flex flex-col items-center justify-center space-y-2 transition-all ${paymentMethod === "JazzCash" ? "bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.4)]" : "bg-black/20 text-gray-400 border-white/10 hover:border-white/30"}`}
                        >
                          <Banknote size={24} />
                          <span className="text-xs font-bold text-center">JazzCash</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details Render */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                      {paymentMethod === "Card" && (
                        <div className="bg-white rounded-lg p-2 filter invert-[.05]">
                          <DropIn
                            options={{
                              authorization: state.clientToken,
                              paypal: {
                                flow: "vault",
                              },
                            }}
                            onInstance={(instance) => (state.instance = instance)}
                          />
                        </div>
                      )}

                      {paymentMethod === "COD" && (
                        <div className="flex flex-col items-center text-center space-y-2 py-4">
                          <Truck size={48} className="text-neon-green animate-pulse" />
                          <h4 className="text-white font-bold">Pay Cash Upon Arrival</h4>
                          <p className="text-sm text-gray-400">Please pay exact amount to the rider.</p>
                        </div>
                      )}

                      {(paymentMethod === "EasyPaisa" || paymentMethod === "JazzCash") && (
                        <div className="flex flex-col space-y-4">
                          <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                            <h4 className="text-white font-bold mb-1 flex items-center space-x-2">
                              <span>{paymentMethod} Instructions</span>
                            </h4>
                            <p className="text-sm text-gray-400 mb-2">Send <strong>${totalCost()}.00</strong> to:</p>
                            <div className="bg-black/40 p-2 rounded text-neon-blue font-mono text-center mb-2 select-all">
                              {paymentMethod === "EasyPaisa" ? paymentSettings.easyPaisaNumber : paymentSettings.jazzCashNumber}
                            </div>
                            <p className="text-xs text-gray-500">Account Title: {paymentMethod === "EasyPaisa" ? paymentSettings.easyPaisaName : paymentSettings.jazzCashName}</p>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-gray-300">Transaction ID</label>
                            <input
                              type="text"
                              placeholder="Enter Trx ID (e.g. 8329XXXXXX)"
                              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue focus:outline-none"
                              value={manualTransactionId}
                              onChange={(e) => setManualTransactionId(e.target.value)}
                            />
                            <p className="text-xs text-gray-500">Enter the transaction ID you received in SMS.</p>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm text-gray-300">Payment Screenshot</label>
                            <div className="flex items-center space-x-2">
                              <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors border border-white/10">
                                <Upload size={16} />
                                <span className="text-sm">Upload Image</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                              </label>
                              {paymentScreenshot && <span className="text-xs text-green-400 truncate max-w-[150px]">{paymentScreenshot.name}</span>}
                            </div>
                            <p className="text-xs text-gray-500">Required: Verify your payment with a screenshot.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handlePay}
                      className="w-full py-4 bg-gradient-to-r from-brand-orange to-orange-600 hover:opacity-90 text-white font-black uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(253,126,20,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-lg"
                    >
                      <span>{paymentMethod === "COD" ? "Place Order" : "Pay Now"}</span>
                      <span className="bg-black/20 px-2 py-0.5 rounded text-sm">${totalCost()}.00</span>
                    </button>

                  </div>
                </Fragment>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-12 h-12 border-4 border-t-neon-blue border-gray-700 rounded-full animate-spin"></div>
                  <span className="text-gray-400 text-sm">Initializing Secure Payment...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="flex flex-col space-y-4">
        {products !== null && products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col md:flex-row items-center md:space-x-6 hover:bg-white/10 transition-colors group"
              >
                <div className="w-full md:w-24 h-24 flex-shrink-0 bg-black/20 rounded-lg overflow-hidden border border-white/5">
                  <img
                    onClick={(e) => navigate(`/products/${product._id}`)}
                    className="w-full h-full object-cover cursor-pointer transform group-hover:scale-110 transition-transform duration-500"
                    src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                    alt={product.pName}
                  />
                </div>

                <div className="flex-1 w-full mt-4 md:mt-0">
                  <h3 className="text-lg font-bold text-white mb-1">{product.pName}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <span>Qty:</span>
                      <span className="text-neon-blue font-bold text-base">{quantity(product._id)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>Price:</span>
                      <span className="text-white">${product.pPrice}.00</span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col items-end">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Subtotal</span>
                  <span className="text-xl font-black text-neon-green drop-shadow-[0_0_5px_rgba(10,255,104,0.3)]">
                    ${subTotal(product._id, product.pPrice)}.00
                  </span>
                </div>
              </div>
            );
          })
        ) : (
            <div className="flex flex-col items-center justify-center py-12 opacity-50 space-y-4">
              <Package size={48} className="text-gray-500" />
              <div className="text-xl text-gray-400">No product found for checkout</div>
            </div>
        )}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;
