import React, { useState, useEffect } from "react";
import Category from "./Category";
import "../style/homepage.scss";

const Homepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="homepage">
      <div className="home-slider-wrapper">
        <div
          className="home-slider"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          <div className="home-slide slide-1">
            <img src="/slider1.png" alt="Banner 1" />
          </div>

          <div className="home-slide slide-2">
            <img src="/slider2.png" alt="Banner 2" />
          </div>

          <div className="home-slide slide-3">
            <img src="/slider3.png" alt="Banner 3" />
          </div>
        </div>
      </div>

      <Category />
    </div>
  );
};

export default Homepage;