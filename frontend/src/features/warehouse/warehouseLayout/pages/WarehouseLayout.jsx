import React from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import "../style/warehouseLayout.scss";

const WarehouseLayout = () => {
    return (
        <div className="warehouse-layout">

            {/* Full width header */}
            <header className="warehouse-header">
                <Header />
            </header>

            {/* Sidebar + Main Content */}
            <div className="warehouse-main">

                <aside className="warehouse-sidebar">
                    <Sidebar />
                </aside>

                <main className="warehouse-content">
                    <MainContent />
                </main>

            </div>

        </div>
    );
};

export default WarehouseLayout;