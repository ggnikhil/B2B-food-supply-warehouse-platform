import React, { useState, useEffect } from "react";
import Category from "../components/Category";
import StoriesFromPartners from "../components/StoriesFromPartners";
import { ChevronRight } from "lucide-react";
import "../style/homepage.scss";

const exploreData = [
  { id: 1, tag: "", img: "https://ik.imagekit.io/nikhil29/supplyX/explore%20section%20images/expore%20image%201.jpg" },
  { id: 2, tag: "", img: "https://ik.imagekit.io/nikhil29/supplyX/explore%20section%20images/expore%20image%202.jpg" },
  { id: 3, tag: "", img: "https://ik.imagekit.io/nikhil29/supplyX/explore%20section%20images/expore%20image%203.jpg" }
]

const trustedBrandData = [
  { id: 1, tag: "", img: "https://ik.imagekit.io/nikhil29/supplyX/explore%20section%20images/veeba_food_services_transparent_4k.png" },
  { id: 2, tag: "", img: "https://ik.imagekit.io/nikhil29/supplyX/explore%20section%20images/ChatGPT%20Image%20Nov%2025,%202026,%2010_49_50%20AM.png" },
  { id: 3, tag: "", img: "https://ik.imagekit.io/nikhil29/supplyX/explore%20section%20images/east_made_spice_transparent_4k.png" },
  { id: 4, tag: "", img: "https://ik.imagekit.io/nikhil29/supplyX/explore%20section%20images/getmor_transparent_4k.png" },
  { id: 5, tag: "", img: "https://ik.imagekit.io/nikhil29/supplyX/explore%20section%20images/golden_crown_transparent_4k.png" },
  // { id: 6, tag: "", img: "https://ik.imagekit.io/nikhil29/supplyX/explore%20section%20images/amul_transparent_4k.png" }
]

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

      <div className="explore-section">
        <h2 className="explore-title">Explore more</h2>

        <div className="explore-product">
          {exploreData.map((item) => (
            <div
              key={item.id}
              className="explore-items"
              style={{ backgroundImage: `url("${item.img}")` }}
            >
              <button className="explore-btn">
                Order now <ChevronRight size={16} />
              </button>
              {item.tag && <span className="explore-tag">{item.tag}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="brand-section">
        <h2 className="brand-title">Trusted brands</h2>

        <div className="brand-list">
          {trustedBrandData.map((item) => (
            <div key={item.id} className="brand-item">
              <img src={item.img} alt={`Brand ${item.id}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
        
      <StoriesFromPartners />

    </div>
  );
};

export default Homepage;