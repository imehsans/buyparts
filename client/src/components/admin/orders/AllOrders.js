import React, { Fragment, useContext, useEffect } from "react";
import moment from "moment";
import { OrderContext } from "./index";
import { fetchData, editOrderReq, deleteOrderReq } from "./Actions";
import { Edit2, Trash2, Box, Package, Truck, CheckCircle, XCircle, Clock, Printer } from "lucide-react";

const apiURL = import.meta.env.VITE_API_URL;

const AllCategory = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const { orders, loading } = data;

  useEffect(() => {
    fetchData(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue shadow-[0_0_15px_#00f3ff]"></div>
          <span className="text-neon-blue animate-pulse">Loading Orders...</span>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="bg-dark-card border border-white/5 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm relative">
        {/* Decorative gradient line */}
        <div className="h-1 w-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"></div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 uppercase tracking-wider font-semibold text-xs text-gray-300">
              <tr>
                <th className="px-6 py-4">Products</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Total</th>
                <th className="px-6 py-4 text-center">Transaction ID</th>
                <th className="px-6 py-4 text-center">Customer</th>
                <th className="px-6 py-4 text-center">Contact</th>
                <th className="px-6 py-4 text-center">Address</th>
                <th className="px-6 py-4 text-center">Created At</th>
                <th className="px-6 py-4 text-center">Updated At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders && orders.length > 0 ? (
                orders.map((item, i) => {
                  return (
                    <CategoryTable
                      key={i}
                      order={item}
                      editOrder={(oId, type, status) =>
                        editOrderReq(oId, type, status, dispatch)
                      }
                    />
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="12"
                      className="px-6 py-12 text-center text-gray-500 italic"
                    >
                    No orders found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/5 text-xs text-center text-gray-600 flex justify-between items-center px-6">
          <span>Order System: Active</span>
          <span>{orders && orders.length} Orders Processed</span>
        </div>
      </div>
    </Fragment>
  );
};

/* Single Category Component */
const CategoryTable = ({ order, editOrder }) => {
  const { dispatch } = useContext(OrderContext);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Not processed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20"><XCircle size={12} className="mr-1" /> Not Processed</span>
      case 'Processing':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"><Clock size={12} className="mr-1" /> Processing</span>
      case 'Shipped':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20"><Truck size={12} className="mr-1" /> Shipped</span>
      case 'Delivered':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20"><CheckCircle size={12} className="mr-1" /> Delivered</span>
      case 'Cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20"><XCircle size={12} className="mr-1" /> Cancelled</span>
      default:
        return <span className="text-gray-500">{status}</span>

    }
  }

  return (
    <Fragment>
      <tr className="hover:bg-white/[0.02] transition-colors group">
        <td className="px-6 py-4">
          <div className="flex flex-col space-y-2">
            {order.allProduct.map((product, i) => {
              return (
                <div className="flex items-center space-x-3 bg-white/5 p-2 rounded-lg border border-white/5" key={i}>
                  <img
                    className="w-10 h-10 object-cover object-center rounded"
                    src={`${apiURL}/uploads/products/${product.id.pImages[0]}`}
                    alt="productImage"
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-xs truncate max-w-[150px]">{product.id.pName}</span>
                    <span className="text-gray-500 text-xs">Qty: {product.quantitiy}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          {getStatusBadge(order.status)}
        </td>
        <td className="px-6 py-4 text-center font-bold text-neon-blue">
          ${order.amount}.00
        </td>
        <td className="px-6 py-4 text-center text-xs font-mono text-gray-500">
          <span className="bg-white/5 px-2 py-1 rounded">{order.transactionId}</span>
        </td>
        <td className="px-6 py-4 text-center text-gray-300 font-medium">{order.user.name}</td>
        <td className="px-6 py-4 text-center text-xs text-gray-500">
          <div className="flex flex-col space-y-1">
            <span>{order.user.email}</span>
            <span>{order.phone}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-center text-xs text-gray-400 max-w-xs truncate" title={order.address}>{order.address}</td>
        <td className="px-6 py-4 text-center text-xs text-gray-500 font-mono">
          {moment(order.createdAt).format("MMM Do YY")}
        </td>
        <td className="px-6 py-4 text-center text-xs text-gray-500 font-mono">
          {moment(order.updatedAt).format("MMM Do YY")}
        </td>
        <td className="px-6 py-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={(e) => editOrder(order._id, true, order.status)}
              className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 hover:text-blue-300 transition-colors border border-blue-500/20"
              title="Edit Status"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={() => {
                const printContent = `
                       <html>
                           <head>
                               <title>Shipping Label</title>
                               <style>
                                   body { font-family: sans-serif; padding: 20px; border: 2px solid black; max-width: 400px; margin: 0 auto; }
                                   h1 { text-align: center; border-bottom: 2px solid black; padding-bottom: 10px; }
                                   .detail { margin: 10px 0; font-size: 16px; }
                                   .detail strong { display: inline-block; width: 100px; }
                                   .footer { margin-top: 20px; font-size: 12px; text-align: center; border-top: 1px solid #ccc; padding-top: 5px; }
                               </style>
                           </head>
                           <body>
                               <h1>ORDER: ${order._id.substring(order._id.length - 6).toUpperCase()}</h1>
                               <div class="detail"><strong>Customer:</strong> ${order.user.name}</div>
                               <div class="detail"><strong>Phone:</strong> ${order.phone}</div>
                               <div class="detail"><strong>Address:</strong><br/>${order.address}</div>
                               <div class="detail"><strong>Amount:</strong> $${order.amount}.00</div>
                               ${order.courierName ? `<div class="detail"><strong>Courier:</strong> ${order.courierName}</div>` : ''}
                               ${order.trackingId ? `<div class="detail"><strong>Tracking:</strong> ${order.trackingId}</div>` : ''}
                               
                               <div class="footer">
                                   Printed on: ${moment().format("MMM Do YY, h:mm a")} <br/>
                                   BUYPARTS 2080
                               </div>
                           </body>
                       </html>
                   `;
                const printWindow = window.open('', '', 'height=600,width=800');
                printWindow.document.write(printContent);
                printWindow.document.close();
                printWindow.print();
              }}
              className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 hover:text-green-300 transition-colors border border-green-500/20"
              title="Print Label"
            >
              <Printer size={16} />
            </button>
            <button
              onClick={(e) => deleteOrderReq(order._id, dispatch)}
              className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 hover:text-red-300 transition-colors border border-red-500/20"
              title="Delete Order"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    </Fragment>
  );
};

export default AllCategory;
