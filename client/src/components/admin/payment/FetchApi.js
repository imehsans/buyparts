import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

export const getPaymentSettings = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/payment/get-payment-settings`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePaymentSettings = async (data) => {
  try {
    let res = await axios.post(`${apiURL}/api/payment/update-payment-settings`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
