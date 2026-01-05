import { createOrder } from "./FetchApi";

export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchbrainTree = async (getBrainTreeToken, setState) => {
  try {
    let responseData = await getBrainTreeToken();
    if (responseData && responseData) {
      setState({
        clientToken: responseData.clientToken,
        success: responseData.success,
      });
      console.log(responseData);
    }
  } catch (error) {
    console.log(error);
  }
};

export const pay = async (
  data,
  dispatch,
  state,
  setState,
  getPaymentProcess,
  totalCost,
  history
) => {
  console.log(state);
  if (!state.address) {
    setState({ ...state, error: "Please provide your address" });
  } else if (!state.phone) {
    setState({ ...state, error: "Please provide your phone number" });
  } else {
    let nonce;
    state.instance
      .requestPaymentMethod()
      .then((data) => {
        dispatch({ type: "loading", payload: true });
        nonce = data.nonce;
        let paymentData = {
          amountTotal: totalCost(),
          paymentMethod: nonce,
        };
        getPaymentProcess(paymentData)
          .then(async (res) => {
            if (res) {
              let orderData = {
                allProduct: JSON.parse(localStorage.getItem("cart")),
                user: JSON.parse(localStorage.getItem("jwt")).user._id,
                amount: res.transaction.amount,
                transactionId: res.transaction.id,
                address: state.address,
                phone: state.phone,
              };
              try {
                let resposeData = await createOrder(orderData);
                if (resposeData.success) {
                  localStorage.setItem("cart", JSON.stringify([]));
                  dispatch({ type: "cartProduct", payload: null });
                  dispatch({ type: "cartTotalCost", payload: null });
                  dispatch({ type: "orderSuccess", payload: true });
                  setState({ clientToken: "", instance: {} });
                  dispatch({ type: "loading", payload: false });
                  return history.push("/");
                } else if (resposeData.error) {
                  console.log(resposeData.error);
                }
              } catch (error) {
                console.log(error);
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
        setState({ ...state, error: error.message });
      });
  }
};

export const placeOrder = async (
  data,
  dispatch,
  state,
  setState,
  totalCost,
  history,
  paymentMethod,
  manualTransactionId,
  paymentScreenshot
) => {
  if (!state.address) {
    setState({ ...state, error: "Please provide your address" });
    return;
  } else if (!state.phone) {
    setState({ ...state, error: "Please provide your phone number" });
    return;
  }

  // Check if manual payment and screenshot is missing
  if ((paymentMethod === "EasyPaisa" || paymentMethod === "JazzCash")) {
    if (!manualTransactionId) {
      setState({ ...state, error: "Please provide Transaction ID" });
      return;
    }
    if (!paymentScreenshot) {
      setState({ ...state, error: "Please upload payment screenshot" });
      return;
    }
  }

  dispatch({ type: "loading", payload: true });

  let orderData = {
    allProduct: JSON.parse(localStorage.getItem("cart")),
    user: JSON.parse(localStorage.getItem("jwt")).user._id,
    amount: totalCost(),
    transactionId: paymentMethod === "COD" ? "COD-" + Date.now() : manualTransactionId,
    address: state.address,
    phone: state.phone,
    // Store payment method if possible, or append to address/trxId if backend not open to change. 
    // Backend schema only has transactionId, address, phone. 
    // We can prepend payment method to transactionId or address for now to be safe.
    transactionId: paymentMethod === "COD" ? "COD" : `${paymentMethod}-${manualTransactionId}`,
  };

  // Convert to FormData if screenshot exists
  let formData = new FormData();
  if (paymentScreenshot) {
    for (const key in orderData) {
      if (key === "allProduct") {
        formData.append(key, JSON.stringify(orderData[key]));
      } else {
        formData.append(key, orderData[key]);
      }
    }
    formData.append("image", paymentScreenshot);
    orderData = formData;
  }

  try {
    let resposeData = await createOrder(orderData);
    if (resposeData.success) {
      localStorage.setItem("cart", JSON.stringify([]));
      dispatch({ type: "cartProduct", payload: null });
      dispatch({ type: "cartTotalCost", payload: null });
      dispatch({ type: "orderSuccess", payload: true });
      setState({ clientToken: "", instance: {} });
      dispatch({ type: "loading", payload: false });
      return history("/"); // React Router v6 use navigate
    } else if (resposeData.error) {
      console.log(resposeData.error);
      setState({ ...state, error: resposeData.error });
      dispatch({ type: "loading", payload: false });
    }
  } catch (error) {
    console.log(error);
    setState({ ...state, error: error.message });
    dispatch({ type: "loading", payload: false });
  }
};
