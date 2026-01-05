import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import MainCategoryMenu from "./MainCategoryMenu";
import AllMainCategories from "./AllMainCategories";
import { mainCategoryState, mainCategoryReducer } from "./MainCategoryContext";

/* This context manage all of the mainCategories component's data */
export const MainCategoryContext = createContext();

const MainCategoryComponent = () => {
  return (
    <div className="grid grid-cols-1 space-y-4 p-4">
      <MainCategoryMenu />
      <AllMainCategories />
    </div>
  );
};

const MainCategories = (props) => {
  const [data, dispatch] = useReducer(mainCategoryReducer, mainCategoryState);
  return (
    <Fragment>
      <MainCategoryContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<MainCategoryComponent />} />
      </MainCategoryContext.Provider>
    </Fragment>
  );
};

export default MainCategories;
