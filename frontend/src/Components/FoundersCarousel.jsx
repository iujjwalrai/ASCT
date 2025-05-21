import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./founder-carousel.css";

const FoundersCarousel = ({ founders }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      origin: "center",
      perView: 3,
      spacing: 24,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    breakpoints: {
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 8 },
      },
      "(min-width: 481px) and (max-width: 640px)": {
        slides: { perView: 1, spacing: 12 },
      },
      "(min-width: 641px) and (max-width: 768px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(min-width: 769px) and (max-width: 1024px)": {
        slides: { perView: 2, spacing: 20 },
      },
    },
  });

  return (
    <div className="relative px-2 sm:px-4 py-8 sm:py-12 mx-2 sm:mx-4 bg-black backdrop-blur-lg rounded-xl shadow-sm">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-center mb-6 sm:mb-12">
          <h2 className="text-center text-white text-2xl sm:text-3xl font-semibold">
            Meet Our <span className="text-blue-500">Founders</span>
          </h2>
        </div>

        {/* Nav Buttons - Only visible on medium and larger screens */}
        <button
          onClick={() => slider.current?.prev()}
          className="carousel-nav-button hidden md:flex absolute -left-2 md:left-2 top-1/2 transform -translate-y-1/2 z-10"
          aria-label="Previous slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          onClick={() => slider.current?.next()}
          className="carousel-nav-button hidden md:flex absolute -right-2 md:right-2 top-1/2 transform -translate-y-1/2 z-10"
          aria-label="Next slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Carousel */}
        <div ref={sliderRef} className="keen-slider founder-slider">
          {founders.map((founder, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={idx}
                className={`keen-slider__slide founder-slide ${isActive ? "active" : "faded"}`}
              >
                <div className="founder-card-container">
                  <div className="founder-card">
                    {/* Front */}
                    <div className="founder-card-front">
                      <div className="founder-shine"></div>
                      <img
                        src={founder.img}
                        alt={founder.name}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                      <div className="founder-name-badge">
                        <div className="founder-name-badge-content">
                          <h3 className="text-white font-medium text-base sm:text-lg">
                            Ad. {founder.name}
                          </h3>
                          <p className="text-blue-200 text-xs sm:text-sm">{founder.desg}</p>
                        </div>
                      </div>
                    </div>

                    {/* Back */}
                    <div className="founder-card-back">
                      <div className="h-full w-full flex flex-col items-center justify-center p-4 sm:p-6 text-center">
                        <div className="mb-2">
                          <span className="inline-block px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                            {founder.desg === "President" ? "ASCT President" : founder.desg}
                          </span>
                        </div>
                        
                        <h3 className="text-gray-800 font-bold text-lg sm:text-xl mb-2 sm:mb-4">
                          Ad. {founder.name}
                        </h3>

                        {founder.bio && (
                          <div className="bio-container">
                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                              {founder.bio}
                            </p>
                          </div>
                        )}

                        <div className="mt-4 sm:mt-6 flex space-x-3">
                          {founder.social && founder.social.map((item, i) => (
                            <a 
                              key={i}
                              href={item.url} 
                              className="text-gray-400 hover:text-blue-500 transition-colors"
                              aria-label={item.type}
                            >
                              {/* Simple icon placeholders - replace with actual icons */}
                              {item.type === "linkedin" && (
                                <svg width="16" height="16" className="sm:w-18 sm:h-18" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                                </svg>
                              )}
                              {item.type === "twitter" && (
                                <svg width="16" height="16" className="sm:w-18 sm:h-18" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
                                </svg>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-4 sm:mt-8 gap-1 sm:gap-2">
          {founders.slice(0, 5).map((_, idx) => (
            <button
              key={idx}
              onClick={() => slider.current?.moveToIdx(idx)}
              className={`dot-indicator ${currentSlide === idx ? "active" : ""}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex justify-center mt-4 space-x-4 md:hidden">
          <button
            onClick={() => slider.current?.prev()}
            className="mobile-nav-button"
            aria-label="Previous slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => slider.current?.next()}
            className="mobile-nav-button"
            aria-label="Next slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoundersCarousel;