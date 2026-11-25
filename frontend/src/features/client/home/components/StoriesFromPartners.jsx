import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import "../style/stories.scss";

const photo = (n) => `https://i.pravatar.cc/200?img=${n}`;

const storiesData = [
  { id: 1, company: "Brew Lane Coffee", role: "Co-Founder", quote: "Consistent supply of high-quality ingredients has reduced our shortages and stockouts, so our outlets never miss a beat.", person: "Aman Verma", photo: photo(12), bg: "linear-gradient(135deg,#5b9aa8,#3f7f8f)" },
  { id: 2, company: "Spice Route Kitchen", role: "Founder", quote: "Their top-quality products and timely deliveries let us plan menus confidently and keep every dish consistent.", person: "Rakesh Nair", photo: photo(15), bg: "linear-gradient(135deg,#a8706a,#8a5550)" },
  { id: 3, company: "Urban Tandoor", role: "Founder", quote: "They stand out by focusing on the smallest details, from fresh produce quality to careful packaging at every order.", person: "Karan Joshi", photo: photo(33), bg: "linear-gradient(135deg,#9a8648,#7a6a3c)" },
  { id: 4, company: "Grill House Eats", role: "Founder", quote: "Their tech-enabled platform simplifies the entire process, from ordering and tracking to quick reorders for our kitchen.", person: "Rohan Mehta", photo: photo(52), bg: "linear-gradient(135deg,#c49a63,#a87f4a)" },
  { id: 5, company: "Daily Bake Studio", role: "Co-Founder", quote: "Reliable stock and transparent pricing helped us scale from one bakery to five locations without supply worries.", person: "Neha Kapoor", photo: photo(47), bg: "linear-gradient(135deg,#6b7fb8,#4f629c)" },
  { id: 1, company: "Brew Lane Coffee", role: "Co-Founder", quote: "Consistent supply of high-quality ingredients has reduced our shortages and stockouts, so our outlets never miss a beat.", person: "Aman Verma", photo: photo(12), bg: "linear-gradient(135deg,#5b9aa8,#3f7f8f)" },
  { id: 2, company: "Spice Route Kitchen", role: "Founder", quote: "Their top-quality products and timely deliveries let us plan menus confidently and keep every dish consistent.", person: "Rakesh Nair", photo: photo(15), bg: "linear-gradient(135deg,#a8706a,#8a5550)" },
  { id: 3, company: "Urban Tandoor", role: "Founder", quote: "They stand out by focusing on the smallest details, from fresh produce quality to careful packaging at every order.", person: "Karan Joshi", photo: photo(33), bg: "linear-gradient(135deg,#9a8648,#7a6a3c)" },
  { id: 4, company: "Grill House Eats", role: "Founder", quote: "Their tech-enabled platform simplifies the entire process, from ordering and tracking to quick reorders for our kitchen.", person: "Rohan Mehta", photo: photo(52), bg: "linear-gradient(135deg,#c49a63,#a87f4a)" },
  { id: 5, company: "Daily Bake Studio", role: "Co-Founder", quote: "Reliable stock and transparent pricing helped us scale from one bakery to five locations without supply worries.", person: "Neha Kapoor", photo: photo(47), bg: "linear-gradient(135deg,#6b7fb8,#4f629c)" },
];

const GAP = 16;

const StoriesFromPartners = () => {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, []);

  const slide = (dir) => {
    const el = trackRef.current;
    const card = el?.firstElementChild;
    if (!card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + GAP), behavior: "smooth" });
  };

  return (
    <section className="stories-section">
      <h2 className="stories-title">Stories from partners</h2>

      <div className="stories-wrapper">
        {canLeft && (
          <button className="stories-arrow left" aria-label="Previous" onClick={() => slide(-1)}>
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="stories-track" ref={trackRef} onScroll={updateArrows}>
          {storiesData.map((item) => (
            <div key={item.id} className="story-card" style={{ background: item.bg }}>
              <div className="story-head">
                <div className="story-logo">
                  <img src={item.photo} alt={item.person} loading="lazy" />
                </div>
                <div>
                  <p className="story-company">{item.company}</p>
                  <p className="story-role">{item.role}</p>
                </div>
              </div>

              <p className="story-quote">{item.quote}</p>
              <h3 className="story-person">{item.person}</h3>

              <button className="story-plus" aria-label="Read story">
                <Plus size={20} />
              </button>
            </div>
          ))}
        </div>

        {canRight && (
          <button className="stories-arrow right" aria-label="Next" onClick={() => slide(1)}>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
};

export default StoriesFromPartners;