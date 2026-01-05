import React, { Fragment, useEffect, useState } from "react";
import Layout from "../layout";
import { getPaymentSettings, updatePaymentSettings } from "./FetchApi";
import { Save, Smartphone, Banknote, CreditCard, ShieldCheck } from "lucide-react";
import { useSnackbar } from 'notistack';

const PaymentSettingsComponent = () => {
  const [data, setData] = useState({
    easyPaisaName: "",
    easyPaisaNumber: "",
    jazzCashName: "",
    jazzCashNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await getPaymentSettings();
    if (responseData && responseData.settings) {
      setData(responseData.settings);
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    setLoading(true);
    let responseData = await updatePaymentSettings(data);
    if (responseData && responseData.success) {
      enqueueSnackbar("Payment Settings Updated Successfully", { variant: "success" });
    } else {
        enqueueSnackbar("Failed to update settings", { variant: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="flex-grow p-6">
      <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-neon-blue/10 rounded-full border border-neon-blue/20">
             <CreditCard className="text-neon-blue" size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Payment Method Settings</h1>
            <p className="text-gray-400 text-sm">Configure manual payment accounts for checkout</p>
          </div>
      </div>
      
      <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden p-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* EasyPaisa Section */}
            <div className="space-y-4">
                <div className="flex items-center space-x-2 text-green-400 border-b border-white/5 pb-2">
                    <Smartphone size={24} />
                    <h2 className="text-xl font-bold">EasyPaisa</h2>
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Account Name</label>
                    <input
                        type="text"
                        value={data.easyPaisaName}
                        onChange={(e) => setData({ ...data, easyPaisaName: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="e.g. John Doe"
                    />
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Account Number</label>
                     <input
                        type="text"
                        value={data.easyPaisaNumber}
                        onChange={(e) => setData({ ...data, easyPaisaNumber: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="e.g. 0300-1234567"
                    />
                </div>
            </div>

            {/* JazzCash Section */}
             <div className="space-y-4">
                <div className="flex items-center space-x-2 text-red-500 border-b border-white/5 pb-2">
                    <Banknote size={24} />
                    <h2 className="text-xl font-bold">JazzCash</h2>
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Account Name</label>
                    <input
                        type="text"
                        value={data.jazzCashName}
                        onChange={(e) => setData({ ...data, jazzCashName: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                         placeholder="e.g. John Doe"
                    />
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Account Number</label>
                     <input
                        type="text"
                        value={data.jazzCashNumber}
                        onChange={(e) => setData({ ...data, jazzCashNumber: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                         placeholder="e.g. 0300-1234567"
                    />
                </div>
            </div>

        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
             <button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-1 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                    <Save size={20} />
                )}
                <span>Save Settings</span>
            </button>
        </div>
      </div>
    </div>
  );
};

const PaymentSettings = (props) => {
  return (
    <Fragment>
      <Layout children={<PaymentSettingsComponent />} />
    </Fragment>
  );
};

export default PaymentSettings;
