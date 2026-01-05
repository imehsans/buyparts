import React, { Fragment, useContext, useEffect } from "react";
import { DashboardContext } from "./";
import { GetAllData } from "./Action";
import { ArrowUpRight, ArrowDownRight, Users, ShoppingCart, Package, Layers } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const StatCard = ({ title, value, icon, color, chartColor }) => {
  // Dummy data for sparkline - randomized to look alive
  const data = [
    { v: 10 }, { v: 15 }, { v: 13 }, { v: 20 }, { v: 18 }, { v: 25 }, { v: 22 }, { v: 30 }
  ];

  return (
    <div className="relative overflow-hidden bg-dark-card border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-sm group hover:border-white/10 transition-all duration-500">
      {/* Background glow effect */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 blur-2xl bg-${color}`} />

      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-white mt-1 group-hover:scale-105 transition-transform duration-300">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-white/5 text-${color} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
          {icon}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-green-400 text-sm font-medium">
          <span className="flex items-center">
            <ArrowUpRight size={16} className="mr-1" />
            <span>+12.5%</span>
          </span>
          <span className="text-gray-500 text-xs">from last week</span>
        </div>

        {/* Mini Chart */}
        <div className="h-10 w-24 opacity-50 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <Area
                type="monotone"
                dataKey="v"
                stroke={chartColor}
                fill={chartColor}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = (props) => {
  const { data, dispatch } = useContext(DashboardContext);

  useEffect(() => {
    GetAllData(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Corrected dependency array

  if (!data) {
    return <div className="p-8 text-center text-gray-500">Loading neural stats...</div>
  }

  return (
    <Fragment>
      <div className="m-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Customers"
          value={data.totalData.Users}
          icon={<Users size={24} />}
          color="neon-blue"
          chartColor="#00f3ff"
        />
        <StatCard
          title="Total Orders"
          value={data.totalData.Orders}
          icon={<ShoppingCart size={24} />}
          color="neon-pink"
          chartColor="#ff0055"
        />
        <StatCard
          title="Total Products"
          value={data.totalData.Products}
          icon={<Package size={24} />}
          color="neon-green"
          chartColor="#0aff68"
        />
        <StatCard
          title="Categories"
          value={data.totalData.Categories}
          icon={<Layers size={24} />}
          color="brand-orange"
          chartColor="#fd7e14"
        />
      </div>
    </Fragment>
  );
};

export default DashboardCard;
