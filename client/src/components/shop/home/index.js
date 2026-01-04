import React, { Fragment, createContext, useReducer, useEffect, useContext } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";
import { getAllProduct } from "../../admin/products/FetchApi";

export const HomeContext = createContext();

const HomeComponent = () => {
  const { data, dispatch } = useContext(HomeContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getAllProduct();
      setTimeout(() => {
        if (responseData && responseData.Products) {
          dispatch({ type: "setProducts", payload: responseData.Products });
          dispatch({ type: "loading", payload: false });
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Slider />

      {/* Categories Row */}
      <section className="my-8">
        <ProductCategory />
      </section>

      {/* New Arrivals */}
      <SingleProduct
        title="New Arrivals"
        tagline="Year 2050 Collection"
        products={data.products ? data.products.slice(0, 4) : []}
      />

      {/* Hot Deals */}
      <SingleProduct
        title="Hot Deals"
        tagline="Limited Time Offers"
        products={data.products ? data.products.slice(4, 8) : []}
      />

      {/* Future Feature Section */}
      <section className="mx-4 md:mx-12 my-12 glass-panel p-8 rounded-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-brand-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 p-4">
            <h3 className="text-4xl font-black text-white mb-4 italic">FUTURE TECH <span className="text-brand-orange">INSIDE</span></h3>
            <p className="text-gray-300 mb-6 font-light">Experience the next generation of automotive excellence. Our 2050 series brings AI-driven performance to your machine.</p>
            <button className="px-8 py-3 bg-brand-orange text-white font-bold rounded-lg hover:shadow-[0_0_20px_rgba(253,126,20,0.6)] transition-all transform hover:-translate-y-1">
              EXPLORE NOW
            </button>
          </div>
          <div className="md:w-1/2 flex justify-center p-4">
            {/* Placeholder for Feature Image - using a futuristic circle */}
            <div className="w-64 h-64 rounded-full border-4 border-brand-orange/30 flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(253,126,20,0.3)]">
              <span className="text-6xl">🏎️</span>
            </div>
          </div>
        </div>
      </section>

      {/* Most Selling */}
      <SingleProduct
        title="Most Selling"
        tagline="Top Rated Gear"
        products={data.products ? data.products.slice(0, 4) : []}
      />

    </Fragment>
  );
};

const Home = (props) => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
