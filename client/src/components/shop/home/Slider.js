import React, { Fragment, useEffect, useContext, useState } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { prevSlide, nextSlide } from "./Mixins";

const apiURL = import.meta.env.VITE_API_URL;

const Slider = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    sliderImages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="relative mt-10 bg-brand-dark border-b border-white/5 shadow-2xl overflow-hidden group">
        {data.sliderImages.length > 0 ? (
          <img
            className="w-full h-[60vh] object-cover opacity-80"
            src={`${apiURL}/uploads/customize/${data.sliderImages[slide].slideImage}`}
            alt="sliderImage"
          />
        ) : (
          <div className="w-full h-[50vh] bg-brand-dark flex items-center justify-center">
            <span className="text-gray-600">No Slide Image</span>
          </div>
        )}

        {data?.sliderImages?.length > 0 ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-80"></div>

            <svg
              onClick={(e) =>
                prevSlide(data.sliderImages.length, slide, setSlide)
              }
              className={`z-20 absolute top-1/2 left-4 transform -translate-y-1/2 w-12 h-12 text-white/50 hover:text-brand-orange cursor-pointer transition-colors`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <svg
              onClick={(e) =>
                nextSlide(data.sliderImages.length, slide, setSlide)
              }
              className={`z-20 absolute top-1/2 right-4 transform -translate-y-1/2 w-12 h-12 text-white/50 hover:text-brand-orange cursor-pointer transition-colors`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-4">
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter drop-shadow-xl text-center">
                Drive the <span className="text-brand-orange">Future</span>
              </h1>
              <a
                href="#shop"
                className="cursor-pointer bg-brand-orange hover:bg-orange-600 text-white font-bold text-xl px-8 py-3 rounded-full shadow-[0_0_20px_rgba(253,126,20,0.5)] transition-all transform hover:scale-105"
              >
                Shop Now
              </a>
            </div>
          </>
        ) : null}
      </div>
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
