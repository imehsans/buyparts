import React, { Fragment, useState, useContext } from "react";
import { OrderContext } from "./index";
import UpdateOrderModal from "./UpdateOrderModal";
import SearchFilter from "./SearchFilter";
import { filterOrder } from "./Actions";
import { getAllOrder } from "./FetchApi";
import { Filter, ChevronDown, ListFilter, Grid, AlertCircle, Clock, Truck, CheckCircle, XCircle } from "lucide-react";

const OrderMenu = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const [activeTab, setActiveTab] = useState("All");

  const filterOrderTabs = async (type) => {
    setActiveTab(type);
    dispatch({ type: "loading", payload: true });
    let responseData = await getAllOrder();
    if (responseData && responseData.Orders) {
      let newData;
      if (type === "All") {
        newData = responseData.Orders;
      } else {
        newData = responseData.Orders.filter((item) => item.status === type);
      }
      dispatch({
        type: "fetchOrderAndChangeState",
        payload: newData,
      });
      dispatch({ type: "loading", payload: false });
    }
  };

  const tabs = [
    { name: "All", icon: <Grid size={16} />, color: "neon-blue" },
    { name: "Not processed", icon: <AlertCircle size={16} />, color: "red-400" },
    { name: "Processing", icon: <Clock size={16} />, color: "yellow-400" },
    { name: "Shipped", icon: <Truck size={16} />, color: "blue-400" },
    { name: "Delivered", icon: <CheckCircle size={16} />, color: "green-400" },
    { name: "Cancelled", icon: <XCircle size={16} />, color: "red-500" },
  ];

  return (
    <Fragment>
      <div className="col-span-1 mb-6 space-y-4">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-dark-card border border-white/5 p-4 rounded-xl shadow-lg backdrop-blur-sm">

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <div className="bg-neon-blue/10 p-2 rounded-lg border border-neon-blue/20">
              <ListFilter size={24} className="text-neon-blue" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-white tracking-wide">Order Management</h2>
              <span className="text-xs text-gray-500">Track and manage customer orders</span>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <SearchFilter />
          </div>
        </div>

        {/* Tab Navigation Filter */}
        <div className="bg-dark-card border border-white/5 p-2 rounded-xl shadow-lg backdrop-blur-sm overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-2 min-w-max">
            {tabs.map((tab) => (
              <div
                key={tab.name}
                onClick={() => filterOrderTabs(tab.name)}
                className={`
                            cursor-pointer px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-all duration-300 border
                            ${activeTab === tab.name
                    ? "bg-white/10 text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    : "bg-transparent text-gray-400 border-transparent hover:bg-white/5 hover:text-gray-200"
                            }
                        `}
              >
                <span className={`${activeTab === tab.name ? `text-${tab.color}` : "text-gray-500"}`}>
                  {tab.icon}
                </span>
                <span className="font-medium text-sm whitespace-nowrap">{tab.name}</span>

                {/* Active Indicator Dot */}
                {activeTab === tab.name && (
                  <span className={`w-1.5 h-1.5 rounded-full bg-${tab.color === 'neon-blue' ? 'neon-blue' : tab.color} shadow-[0_0_5px_currentColor]`}></span>
                )}
              </div>
            ))}
          </div>
        </div>

        <UpdateOrderModal />
      </div>
    </Fragment>
  );
};

export default OrderMenu;
