import React, { Fragment, useContext, useState, useEffect } from "react";
import { OrderContext } from "./index";
import { getAllOrder, editCategory } from "./FetchApi";
import { X, Save } from "lucide-react";

const UpdateOrderModal = (props) => {
  const { data, dispatch } = useContext(OrderContext);

  const [status, setStatus] = useState("");
  const [oId, setOid] = useState("");
  const [courierName, setCourierName] = useState("");
  const [trackingId, setTrackingId] = useState("");

  // New state to handle dropdown selection separately from the actual value
  const [courierDropdown, setCourierDropdown] = useState("");

  useEffect(() => {
    setOid(data.updateOrderModal.oId);
    setStatus(data.updateOrderModal.status);

    // Reset fields when modal opens
    setCourierName("");
    setTrackingId("");
    setCourierDropdown("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.updateOrderModal.modal]);

  const fetchData = async () => {
    let responseData = await getAllOrder();
    if (responseData.Orders) {
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: responseData.Orders,
      });
    }
  };

  const handleCourierChange = (e) => {
    const value = e.target.value;
    setCourierDropdown(value);
    if (value !== "Custom") {
      setCourierName(value);
    } else {
      setCourierName(""); // Clear for user input
    }
  };

  const submitForm = async () => {
    dispatch({ type: "loading", payload: true });
    let responseData = await editCategory(oId, status, courierName, trackingId);
    if (responseData.error) {
      dispatch({ type: "loading", payload: false });
    } else if (responseData.success) {
      console.log(responseData.success);
      dispatch({ type: "updateOrderModalClose" });
      fetchData();
      dispatch({ type: "loading", payload: false });
      setCourierName("");
      setTrackingId("");
    }
  };

  return (
    <Fragment>
      {/* Black Overlay */}
      <div
        onClick={(e) => dispatch({ type: "updateOrderModalClose" })}
        className={`${
          data.updateOrderModal.modal ? "" : "hidden"
          } fixed top-0 left-0 z-40 w-full h-full bg-black/70 backdrop-blur-sm transition-opacity duration-300`}
      />
      {/* End Black Overlay */}

      {/* Modal Start */}
      <div
        className={`${
          data.updateOrderModal.modal ? "" : "hidden"
          } fixed inset-0 m-4 flex items-center z-50 justify-center transition-opacity duration-300`}
      >
        <div className="relative bg-dark-card w-full md:w-3/6 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 rounded-2xl flex flex-col items-center space-y-4 overflow-y-auto px-4 py-8 md:px-8 animate-in zoom-in-95 duration-200">

          <div className="flex items-center justify-between w-full border-b border-white/10 pb-4">
            <span className="text-left font-bold text-2xl tracking-wide text-white">
              Update Order Status
            </span>
            {/* Close Modal */}
            <span
              onClick={(e) => dispatch({ type: "updateOrderModalClose" })}
              className="cursor-pointer text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </span>
          </div>

          <div className="flex flex-col space-y-4 w-full mt-4">
            <label htmlFor="status" className="text-sm font-medium text-gray-400 uppercase tracking-widest">Select New Status</label>
            <select
              value={status}
              name="status"
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white transition-all font-outfit appearance-none"
              id="status"
            >
              <option value="Not processed" className="bg-dark-card text-white">Not processed</option>
              <option value="Processing" className="bg-dark-card text-white">Processing</option>
              <option value="Shipped" className="bg-dark-card text-white">Shipped</option>
              <option value="Delivered" className="bg-dark-card text-white">Delivered</option>
              <option value="Cancelled" className="bg-dark-card text-white">Cancelled</option>
            </select>

            {status === "Shipped" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-in fade-in duration-300">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">Courier Name</label>
                  <select
                    value={courierDropdown}
                    onChange={handleCourierChange}
                    className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white transition-all font-outfit appearance-none mb-2"
                  >
                    <option value="" disabled>Select Courier</option>
                    <option value="TCS">TCS</option>
                    <option value="Leopards">Leopards</option>
                    <option value="M&P">M&P</option>
                    <option value="Call Courier">Call Courier</option>
                    <option value="PostEx">PostEx</option>
                    <option value="Custom">Custom / Other</option>
                  </select>

                  {courierDropdown === "Custom" && (
                    <input
                      type="text"
                      placeholder="Enter Courier Name"
                      className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white animate-in slide-in-from-top-2"
                      value={courierName}
                      onChange={(e) => setCourierName(e.target.value)}
                    />
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-400 uppercase tracking-widest">Tracking ID</label>
                  <input
                    type="text"
                    placeholder="e.g. 123456789"
                    className="px-4 py-3 bg-black/20 border border-gray-700 rounded-lg focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue text-white"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                </div>
              </div>
            )}

          </div>

          <div className="flex flex-col space-y-1 w-full pb-4 md:pb-6 mt-8">
            <button
              onClick={(e) => submitForm()}
              className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg text-lg font-bold py-3 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all uppercase tracking-wider"
            >
              <Save size={20} />
              <span>Update Status</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateOrderModal;
