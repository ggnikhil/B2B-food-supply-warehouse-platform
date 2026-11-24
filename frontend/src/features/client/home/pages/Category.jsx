import React from "react";
import "../style/category.scss";

const catagoryData = [
  { id: 1, tag: "Your Menu Add-ons", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_y5p5zyy5p5zyy5p5.png" },
  { id: 2, tag: "Fresh Dairy", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_axfghtaxfghtaxfg.png" },
  { id: 3, tag: "Butter & Cheese", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_93yw0x93yw0x93yw%20(1).png" },
  { id: 4, tag: "Fruits & Vegetables", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_h6qc6oh6qc6oh6qc.png" },
  { id: 5, tag: "Canned & Imported", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_ykchguykchguykch.png" },
  { id: 6, tag: "Sauces & Seasoning", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_3gebdr3gebdr3geb.png" },
  { id: 7, tag: "Masala, Salt & Sugar", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_3qm0fq3qm0fq3qm0.png" },
  { id: 8, tag: "Packaging Material", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_nas1usnas1usnas1.png" },
  { id: 9, tag: "Chicken & Eggs", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_9kixm39kixm39kix.png" },
  { id: 10, tag: "Frozen & Instant Food", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_3v2ekd3v2ekd3v2e.png" },
  { id: 11, tag: "Bakery & Chocolates", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_w83d2tw83d2tw83d.png" },
  { id: 12, tag: "Edible Oils", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_yhl5znyhl5znyhl5.png" },
  { id: 13, tag: "Beverages & Mixers", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_xg1ckexg1ckexg1c.png" },
  { id: 14, tag: "Cleaning & Consumables", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_w01gssw01gssw01g.png" },
  { id: 15, tag: "Pulses", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_v5z9a7v5z9a7v5z9.png" },
  { id: 16, tag: "Flours", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_26h6pl26h6pl26h6.png" },
  { id: 17, tag: "Dry Fruits & Nuts", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_t6at2at6at2at6at.png" },
  { id: 18, tag: "Rice & Rice Products", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_atomqeatomqeatom.png" },
  { id: 19, tag: "Fish, Prawns & Seafood", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_s0r1fds0r1fds0r1.png" },
  { id: 20, tag: "Mutton & Duck", img: "https://ik.imagekit.io/nikhil29/supplyX/Gemini_Generated_Image_5xj8ji5xj8ji5xj8.png" },
]

const Category = () => {
  return (
    <section className="category-section">
      <div className="category-container">
        <h2 className="category-title">Shop by category</h2>

        <div className="category-grid">
          {catagoryData.map((elem) => (
            <div className="category-card" key={elem.id}>
              <div className="category-img">
                <img src={elem.img} alt={elem.tag} loading="lazy" />
              </div>
              <p className="category-name">{elem.tag}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;