const fs = require("fs");

const categoriesFolder = "./public/uploads/categories";
const customizeFolder = "./public/uploads/customize";
const productsFolder = "./public/uploads/products";

const CreateAllFolder = () => {
  if (!fs.existsSync(categoriesFolder)) {
    fs.mkdirSync(categoriesFolder, {
      recursive: true,
    });
  }

  if (!fs.existsSync(customizeFolder)) {
    fs.mkdirSync(customizeFolder, {
      recursive: true,
    });
  }

  if (!fs.existsSync(productsFolder)) {
    fs.mkdirSync(productsFolder, {
      recursive: true,
    });
  }

  const ordersFolder = "./public/uploads/orders";
  if (!fs.existsSync(ordersFolder)) {
    fs.mkdirSync(ordersFolder, {
      recursive: true,
    });
  }

  const userProfileFolder = "./public/uploads/user";
  if (!fs.existsSync(userProfileFolder)) {
    fs.mkdirSync(userProfileFolder, {
      recursive: true,
    });
  }

  const mainCategoriesFolder = "./public/uploads/mainCategories";
  if (!fs.existsSync(mainCategoriesFolder)) {
    fs.mkdirSync(mainCategoriesFolder, {
      recursive: true,
    });
  }
};

module.exports = CreateAllFolder;
