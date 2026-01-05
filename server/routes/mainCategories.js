const express = require("express");
const router = express.Router();
const mainCategoryController = require("../controller/mainCategories");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/mainCategories");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/all-main-category", mainCategoryController.getAllMainCategory);
router.post(
  "/add-main-category",
  upload.single("mImage"),
  mainCategoryController.postAddMainCategory
);
router.post("/edit-main-category", mainCategoryController.postEditMainCategory);
router.post(
  "/delete-main-category",
  mainCategoryController.getDeleteMainCategory
);

module.exports = router;
