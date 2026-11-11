import React from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import "../style/warehouseLayout.scss";
import { useMatches } from "react-router-dom";

const WarehouseLayout = () => {

    const matchs = useMatches()

    const currentMatch = [...matchs].reverse().find((match) => match.handle?.title)
    const title = currentMatch.handle.title

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

                <div className="menu-name">
                    {title}
                </div>

                <main className="warehouse-content">
                    <MainContent />
                </main>

            </div>

        </div>
    );
};

export default WarehouseLayout;