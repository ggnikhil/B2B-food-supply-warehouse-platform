import React, { useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuArrowRight, LuPlus } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import "../style/homepage.scss";

/* ---------- DUMMY DATA (baad me API se replace) ---------- */
const img = (w, h, t = "Image") =>
  `https://placehold.co/${w}x${h}/F2F4F7/9E9E9E?text=${encodeURIComponent(t)}`;

const heroSlides = [
  { id: 1, title: "Too much cheese? Never!", sub: "Get your hands on cheesy favourites & buttery delights", bg: "linear-gradient(90deg,#1b3a4b,#2d5a6e)" },
  { id: 2, title: "Fresh from the farm", sub: "Fruits & vegetables delivered every morning", bg: "linear-gradient(90deg,#1d4d3a,#2f7a5a)" },
  { id: 3, title: "Stock up your pantry", sub: "Best rates on oils, masalas and flours", bg: "linear-gradient(90deg,#4a2d1b,#7a4a2f)" },
];

const categories = [
  "Your Menu Add-ons", "Fresh Dairy", "Butter, Cheese & More", "Fruits & Vegetables",
  "Canned & Imported Items", "Sauces & Seasoning", "Masala, Salt & Sugar", "Packaging Material",
  "Chicken & Eggs", "Frozen & Instant Food", "Bakery & Chocolates", "Edible Oils",
  "Beverages & Mixers", "Cleaning & Consumables", "Pulses", "Flours",
  "Dry Fruits & Nuts", "Rice & Rice Products", "Fish, Prawns & Seafood",
  "Mutton, Duck & More", "Kitchenware", "Kitchen Appliances",
];

const exploreBanners = [
  { id: 1, title: "The star of every celebration", text: "Festive baking made even better with premium bakery solutions", bg: "linear-gradient(90deg,#fff1d6,#ffe3b0)" },
  { id: 2, title: "Bake with the best", text: "Chocolates, couverture & cocoa powder for richer bakes", bg: "linear-gradient(90deg,#ffe9e0,#ffd2c2)" },
];

const brands = [
  { id: 1, name: "Brand 1", bg: "linear-gradient(180deg,#0088ee,#1656c6)" },
  { id: 2, name: "Brand 2", bg: "linear-gradient(180deg,#ef2f3f,#c41e2f)" },
  { id: 3, name: "Brand 3", bg: "linear-gradient(180deg,#f6c691,#b48535)" },
  { id: 4, name: "Brand 4", bg: "linear-gradient(180deg,#009a51,#108145)" },
  { id: 5, name: "Brand 5", bg: "linear-gradient(180deg,#e01010,#a00000)" },
  { id: 6, name: "Brand 6", bg: "linear-gradient(180deg,#4a56c6,#242f64)" },
];

const stories = [
  { id: 1, name: "Partner One", role: "Founder", quote: "...consistent supply of high-quality ingredients...", person: "Person One", bg: "#5b8f9e" },
  { id: 2, name: "Partner Two", role: "Founder", quote: "Their top-quality products and timely deliveries...", person: "Person Two", bg: "#9a5c58" },
  { id: 3, name: "Partner Three", role: "Founder", quote: "...stands out by focusing on the smallest details...", person: "Person Three", bg: "#9a8248" },
  { id: 4, name: "Partner Four", role: "Co-Founder", quote: "..their tech-led approach simplifies the process...", person: "Person Four", bg: "#b48a5a" },
  { id: 5, name: "Partner Five", role: "Founder", quote: "...a reliable partner in our growth journey...", person: "Person Five", bg: "#e0707e" },
];

const sectionsMeta = [
  ["Your Menu Add-ons", "custom food solutions"],
  ["Fresh Dairy", "paneer, fresh cheese & curd"],
  ["Butter, Cheese & More", "dairy essentials"],
  ["Fruits & Vegetables", "farm fresh, guaranteed"],
  ["Canned & Imported Items", "pantry staples"],
  ["Sauces & Seasoning", "flavour makers"],
  ["Masala, Salt & Sugar", "kitchen basics"],
  ["Packaging Material", "containers & more"],
  ["Chicken & Eggs", "fresh daily"],
  ["Frozen & Instant Food", "ready in minutes"],
  ["Bakery & Chocolates", "bakery essentials"],
  ["Edible Oils", "cooking oils"],
  ["Beverages & Mixers", "beverages & mixers"],
  ["Cleaning & Consumables", "kitchen hygiene"],
  ["Pulses", "dals & more"],
  ["Flours", "atta, maida & more"],
  ["Dry Fruits & Nuts", "premium quality"],
  ["Rice & Rice Products", "all varieties"],
  ["Fish, Prawns & Seafood", "fresh catch"],
];

const makeProducts = (s) =>
  Array.from({ length: 8 }, (_, i) => ({
    id: `${s}-${i}`,
    name: `Dummy Product ${i + 1} (80 gm/pc), 720 gm pack`,
    pack: `${(i % 4) + 1} pack`,
    rating: (4.3 + (i % 5) / 10).toFixed(1),
    reviews: 70 + i * 23,
    price: (250 + i * 12.5).toFixed(2),
    unit: `₹${(30 + i).toFixed(2)}/pc`,
    best: `₹${(28 + i).toFixed(2)}/pc`,
    tag: s === 0 && i < 5 ? `Prep time: ${(i % 3) + 1} minute` : null,
  }));

/* ---------- HELPERS ---------- */
const useScroller = () => {
  const ref = useRef(null);
  const scroll = (dir) =>
    ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: "smooth" });
  return [ref, scroll];
};

/* ---------- SECTIONS ---------- */
const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="home__hero">
      <div className="home__hero-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {heroSlides.map((s) => (
          <div key={s.id} className="home__hero-slide" style={{ background: s.bg }}>
            <div className="home__hero-text">
              <h1>{s.title}</h1>
              <p>{s.sub}</p>
              <button className="home__btn-dark">Shop here <LuChevronRight /></button>
            </div>
            <img src={img(420, 260, "Banner Image")} alt={s.title} />
          </div>
        ))}
      </div>
      <div className="home__hero-dots">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            aria-label={`Slide ${i + 1}`}
            className={i === index ? "is-active" : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

const Categories = () => (
  <section className="home__container home__block">
    <h2 className="home__title">Shop by category</h2>
    <div className="home__cat-grid">
      {categories.map((c) => (
        <button key={c} className="home__cat">
          <img src={img(120, 90, "Item")} alt={c} />
          <span>{c}</span>
        </button>
      ))}
    </div>
  </section>
);

const ExploreMore = () => (
  <section className="home__container home__block">
    <h2 className="home__title">Explore more</h2>
    <div className="home__explore">
      {exploreBanners.map((b) => (
        <div key={b.id} className="home__explore-card" style={{ background: b.bg }}>
          <div>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
            <button className="home__btn-dark">Order now <LuChevronRight /></button>
          </div>
          <img src={img(180, 180, "Product")} alt={b.title} />
        </div>
      ))}
    </div>
  </section>
);

const TrustedBrands = () => (
  <section className="home__container home__block">
    <h2 className="home__title">Trusted brands</h2>
    <div className="home__brands">
      {brands.map((b) => (
        <div key={b.id} className="home__brand" style={{ background: b.bg }}>
          <div className="home__brand-logo">{b.name}</div>
          <img src={img(160, 120, "Products")} alt={b.name} />
        </div>
      ))}
    </div>
  </section>
);

const Stories = () => {
  const [ref, scroll] = useScroller();
  return (
    <section className="home__container home__block">
      <h2 className="home__title">Stories from partners</h2>
      <div className="home__stories-wrap">
        <button className="home__arrow home__arrow--float-left" onClick={() => scroll(-1)} aria-label="Previous">
          <LuChevronLeft />
        </button>
        <div className="home__stories" ref={ref}>
          {stories.map((s) => (
            <article key={s.id} className="home__story" style={{ background: s.bg }}>
              <div className="home__story-head">
                <img src={img(48, 48, "Logo")} alt={s.name} />
                <div>
                  <h4>{s.name}</h4>
                  <small>{s.role}</small>
                </div>
              </div>
              <p>{s.quote}</p>
              <strong className="home__story-person">{s.person}</strong>
              <img className="home__story-photo" src={img(150, 190, "Photo")} alt={s.person} />
              <span className="home__story-plus"><LuPlus /></span>
            </article>
          ))}
        </div>
        <button className="home__arrow home__arrow--float-right" onClick={() => scroll(1)} aria-label="Next">
          <LuChevronRight />
        </button>
      </div>
    </section>
  );
};

const ProductCard = ({ p }) => (
  <article className="home__prod">
    <div className="home__prod-img">
      <img src={img(204, 204, "Product")} alt={p.name} />
      {p.tag && <span className="home__prod-tag">{p.tag}</span>}
      <span className="home__veg" />
      <button className="home__add">ADD <LuPlus /></button>
    </div>
    <h4>{p.name}</h4>
    <div className="home__prod-meta">
      <span className="home__chip">{p.pack}</span>
      <span className="home__rating"><FaStar /> {p.rating} <small>({p.reviews})</small></span>
    </div>
    <strong className="home__price">₹{p.price}</strong>
    <small className="home__unit">{p.unit}</small>
    <span className="home__best">{p.best} Best rate</span>
  </article>
);

const ProductSection = ({ title, sub, products }) => {
  const [ref, scroll] = useScroller();
  return (
    <section className="home__container home__block">
      <div className="home__sec-head">
        <div className="home__sec-title">
          <img src={img(56, 56, "Icon")} alt="" />
          <div>
            <h2>{title}</h2>
            <p>{sub}</p>
          </div>
        </div>
        <div className="home__sec-actions">
          <button className="home__arrow" onClick={() => scroll(-1)} aria-label="Previous"><LuChevronLeft /></button>
          <button className="home__arrow" onClick={() => scroll(1)} aria-label="Next"><LuChevronRight /></button>
          <button className="home__see-all">See all <LuArrowRight /></button>
        </div>
      </div>
      <div className="home__track" ref={ref}>
        {products.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </section>
  );
};

/* ---------- PAGE ---------- */
const Home = () => (
  <div className="home">
    <Hero />
    <Categories />
    <ExploreMore />
    <TrustedBrands />
    <Stories />
    {sectionsMeta.map(([title, sub], i) => (
      <ProductSection key={title} title={title} sub={sub} products={makeProducts(i)} />
    ))}
  </div>
);

export default Home;