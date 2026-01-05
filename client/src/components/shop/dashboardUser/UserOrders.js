import React, { Fragment, useEffect, useContext, useState } from "react";
import moment from "moment";
import { fetchOrderByUser } from "./Action";
import Layout, { DashboardUserContext } from "./Layout";
import { Loader, Package, AlertCircle, Star } from "lucide-react";

import ReviewModal from "./ReviewModal";

const apiURL = import.meta.env.VITE_API_URL;

const TableHeader = () => {
  return (
    <Fragment>
      <thead>
        <tr className="bg-white/5 text-gray-300 text-sm uppercase tracking-wider text-left">
          <th className="px-6 py-4 rounded-tl-xl">Products</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4">Total</th>
          <th className="px-6 py-4">Phone</th>
          <th className="px-6 py-4">Address</th>
          <th className="px-6 py-4">Transaction Id</th>
          <th className="px-6 py-4">Tracking Details</th>
          <th className="px-6 py-4">Date</th>
          <th className="px-6 py-4 rounded-tr-xl">Updated</th>
          <th className="px-6 py-4 text-center rounded-tr-xl">Actions</th>
        </tr>
      </thead>
    </Fragment>
  );
};

const TableBody = ({ order, openReviewModal }) => {
  return (
    <Fragment>
      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors text-gray-300 text-sm">
        <td className="px-6 py-4">
          <div className="flex flex-col space-y-2">
            {order.allProduct.map((product, i) => {
              return (
                <div className="flex items-center space-x-3" key={i}>
                  <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-black/20 border border-white/10">
                    <img
                      className="w-full h-full object-cover"
                      src={`${apiURL}/uploads/products/${product.id.pImages[0]}`}
                      alt="productImage"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{product.id.pName}</span>
                    <span className="text-xs text-gray-500">Qty: {product.quantitiy}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </td>
        <td className="px-6 py-4">
          {order.status === "Not processed" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
              Not processed
            </span>
          )}
          {order.status === "Processing" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              Processing
            </span>
          )}
          {order.status === "Shipped" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Shipped
            </span>
          )}
          {order.status === "Delivered" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
              Delivered
            </span>
          )}
          {order.status === "Cancelled" && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
              Cancelled
            </span>
          )}
        </td>
        <td className="px-6 py-4 font-bold text-white">
          ${order.amount}.00
        </td>
        <td className="px-6 py-4">{order.phone}</td>
        <td className="px-6 py-4 max-w-xs truncate" title={order.address}>{order.address}</td>
        <td className="px-6 py-4 font-mono text-xs">{order.transactionId}</td>
        <td className="px-6 py-4">
          {order.courierName && order.trackingId ? (
            <div className="flex flex-col space-y-1">
              <span className="text-neon-blue font-bold text-xs uppercase">{order.courierName}</span>
              <span className="text-gray-400 text-xs font-mono">{order.trackingId}</span>
            </div>
          ) : (
            <span className="text-gray-600 text-xs italic">Pending</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {moment(order.createdAt).format("MMM Do YY")}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {moment(order.updatedAt).format("MMM Do YY")}
        </td>
        <td className="px-6 py-4 text-center">
          {order.status === "Delivered" && (
            <button
              onClick={() => openReviewModal(order)}
              className="inline-flex items-center space-x-1 px-3 py-1.5 bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 rounded-lg hover:bg-yellow-400 hover:text-black transition-all text-xs font-bold uppercase tracking-wider"
            >
              <Star size={14} className="fill-current" />
              <span>Feedback</span>
            </button>
          )}
        </td>
      </tr>
    </Fragment>
  );
};

const OrdersComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const { OrderByUser: orders } = data;

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const openReviewModal = (order) => {
    setSelectedOrder(order);
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    fetchOrderByUser(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.loading) {
    return (
      <div className="w-full md:w-9/12 flex items-center justify-center py-24">
        <div className="flex flex-col items-center space-y-4">
          <Loader size={48} className="text-neon-blue animate-spin" />
          <span className="text-gray-400 font-medium animate-pulse">Loading Orders...</span>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:pl-8">
        <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative min-h-[500px]">
          {/* Decorative Header Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple"></div>

          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-neon-blue/10 rounded-lg">
                <Package className="text-neon-blue" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-wide">My Orders</h2>
            </div>
            <span className="text-xs font-mono text-gray-500 bg-black/30 px-3 py-1 rounded-full border border-white/5">
              Total Orders: {orders ? orders.length : 0}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <TableHeader />
              <tbody className="divide-y divide-white/5">
                {orders && orders.length > 0 ? (
                  orders.map((order, i) => {
                    return <TableBody key={i} order={order} openReviewModal={openReviewModal} />;
                  })
                ) : (
                  <tr>
                    <td
                        colSpan="9"
                        className="px-6 py-24 text-center"
                    >
                        <div className="flex flex-col items-center justify-center space-y-4 opacity-50">
                          <AlertCircle size={48} className="text-gray-500" />
                          <span className="text-xl text-gray-400">No orders found!</span>
                        </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserOrders = (props) => {
  return (
    <Fragment>
      <Layout children={<OrdersComponent />} />
    </Fragment>
  );
};

export default UserOrders;
