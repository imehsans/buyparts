const { toTitleCase } = require("../config/function");
const mainCategoryModel = require("../models/mainCategories");
const fs = require("fs");

class MainCategory {
  async getAllMainCategory(req, res) {
    try {
      let MainCategories = await mainCategoryModel.find({}).sort({ _id: -1 });
      if (MainCategories) {
        return res.json({ MainCategories });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postAddMainCategory(req, res) {
    let { mName, mDescription, mStatus } = req.body;
    let mImage = req.file.filename;
    const filePath = `../server/public/uploads/mainCategories/${mImage}`;

    if (!mName || !mDescription || !mStatus || !mImage) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
        return res.json({ error: "All filled must be required" });
      });
    } else {
      mName = toTitleCase(mName);
      try {
        let checkMainCategoryExists = await mainCategoryModel.findOne({ mName: mName });
        if (checkMainCategoryExists) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ error: "Main Category already exists" });
          });
        } else {
          let newMainCategory = new mainCategoryModel({
            mName,
            mDescription,
            mStatus,
            mImage,
          });
          try {
            await newMainCategory.save();
            return res.json({ success: "Main Category created successfully" });
          } catch (err) {
            console.log(err);
            return res.json({ error: "Could not create main category" });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postEditMainCategory(req, res) {
    let { mId, mDescription, mStatus } = req.body;
    if (!mId || !mDescription || !mStatus) {
      return res.json({ error: "All filled must be required" });
    }
    try {
      let editMainCategory = mainCategoryModel.findByIdAndUpdate(mId, {
        mDescription,
        mStatus,
        updatedAt: Date.now(),
      });
      let edit = await editMainCategory.exec();
      if (edit) {
        return res.json({ success: "Main Category edit successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getDeleteMainCategory(req, res) {
    let { mId } = req.body;
    if (!mId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deletedMainCategoryFile = await mainCategoryModel.findById(mId);
        const filePath = `../server/public/uploads/mainCategories/${deletedMainCategoryFile.mImage}`;

        let deleteMainCategory = await mainCategoryModel.findByIdAndDelete(mId);
        if (deleteMainCategory) {
          // Delete Image from uploads -> mainCategories folder
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log(err);
            }
            return res.json({ success: "Main Category deleted successfully" });
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const mainCategoryController = new MainCategory();
module.exports = mainCategoryController;
