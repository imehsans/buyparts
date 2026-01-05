import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL;

const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;
const Headers = () => {
  return {
    headers: {
      token: `Bearer ${BearerToken()}`,
    },
  };
};

export const getAllMainCategory = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/main-category/all-main-category`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createMainCategory = async ({
  mName,
  mImage,
  mDescription,
  mStatus,
}) => {
  let formData = new FormData();
  formData.append("mImage", mImage);
  formData.append("mName", mName);
  formData.append("mDescription", mDescription);
  formData.append("mStatus", mStatus);

  try {
    let res = await axios.post(
      `${apiURL}/api/main-category/add-main-category`,
      formData,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editMainCategory = async (mId, des, status) => {
  let data = { mId: mId, mDescription: des, mStatus: status };
  try {
    let res = await axios.post(
      `${apiURL}/api/main-category/edit-main-category`,
      data,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMainCategory = async (mId) => {
  try {
    let res = await axios.post(
      `${apiURL}/api/main-category/delete-main-category`,
      { mId },
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
