import React, { Fragment, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DashboardContext } from "./";
import { todayAllOrders } from "./Action";
import { ExternalLink } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const SellTable = () => {
  const navigate = useNavigate();
  const { data, dispatch } = useContext(DashboardContext);

  useEffect(() => {
    todayAllOrders(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ordersList = () => {
    let newList = [];
    if (data && data.totalOrders && data.totalOrders.Orders) {
      data.totalOrders.Orders.forEach(function (elem) {
        if (moment(elem.createdAt).format("LL") === moment().format("LL")) {
          newList = [...newList, elem];
        }
      });
    }
    return newList;
  };

  const orders = ordersList();

  return (
    <Fragment>
      <div className="mx-6 mb-6 bg-dark-card border border-white/5 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-sm relative">
        {/* Decorative gradient line */}
        <div className="h-1 w-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"></div>

        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-white tracking-wide">
              Today's Orders
            </h2>
            <span className="bg-neon-blue/20 text-neon-blue text-xs font-bold px-3 py-1 rounded-full border border-neon-blue/30 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
              {orders.length} Active
            </span>
          </div>

          <button
            onClick={() => navigate("/admin/dashboard/orders")}
            className="group flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <span>View All Transmissions</span>
            <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 uppercase tracking-wider font-semibold text-xs text-gray-300">
              <tr>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length > 0 ? (
                orders.map((item, key) => (
                  <TodayOrderTable order={item} key={key} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                      className="px-6 py-12 text-center text-gray-500 italic"
                    >
                    No signals detected for the current cycle.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-white/5 text-xs text-center text-gray-600">
          System Sync: {moment().format('LT')}
        </div>
      </div>
    </Fragment>
  );
};

const TodayOrderTable = ({ order }) => {
  return (
    <tr className="hover:bg-white/[0.02] transition-colors group">
      <td className="px-6 py-4">
        <div className="flex flex-col space-y-1">
          {order.allProduct.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-white font-medium">{item.id.pName}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300 font-mono">x{item.quantitiy}</span>
            </div>
          ))}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex -space-x-2 overflow-hidden">
          {order.allProduct.map((item, index) => (
            <img
              key={index}
              className="inline-block h-10 w-10 rounded-full ring-2 ring-dark-card object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              src={`${apiURL}/uploads/products/${item.id.pImages[0]}`}
              alt="Product"
            />
          ))}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <StatusBadge status={order.status} />
      </td>
      <td className="px-6 py-4">
        <div className="max-w-xs truncate text-gray-300" title={order.address}>
          {order.address}
        </div>
      </td>
      <td className="px-6 py-4 text-right font-mono text-xs text-gray-500">
        {moment(order.createdAt).format("HH:mm:ss")}
      </td>
    </tr>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    "Not processed": "bg-red-500/10 text-red-500 border-red-500/20 shadow-red-500/20",
    "Processing": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 shadow-yellow-500/20",
    "Shipped": "bg-blue-500/10 text-blue-500 border-blue-500/20 shadow-blue-500/20",
    "Delivered": "bg-green-500/10 text-green-500 border-green-500/20 shadow-green-500/20",
    "Cancelled": "bg-gray-500/10 text-gray-400 border-gray-500/20 shadow-gray-500/20",
  };

  const defaultStyle = "bg-gray-500/10 text-gray-400 border-gray-500/20";
  const activeStyle = styles[status] || defaultStyle;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-[0_0_10px_rgba(0,0,0,0)] ${activeStyle} backdrop-blur-md`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${activeStyle.split(' ')[1].replace('text-', 'bg-')}`}></span>
      {status}
    </span>
  );
};

const TodaySell = (props) => {
  return (
    <div className="w-full">
      <SellTable />
    </div>
  );
};

export default TodaySell;
