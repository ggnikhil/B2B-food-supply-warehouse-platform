import React from "react";
import Navbar from "./Navbar";
import MainContent from "./MainContent";
import Footer from "./Footer";
import "../style/clientlayout.scss";

const ClientLayout = () => {
  return (
    <div className="client-homepage">
      <div className="client-homepage__navbar">
        <Navbar />
      </div>
      <div className="client-homepage__main">
        <MainContent />
      </div>
      <div className="client-homepage__footer">
        <Footer />
      </div>
    </div>
  );
};

export default ClientLayout;