// 

import { Link } from "react-router";
import { sidebarMenu } from "../../warehouseLayout/sidebarMenu";
import "../style/home.scss";

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
}

// Sidebar ke wahi items jinka page ban chuka hai (Home khud ko chhodke)
const quickLinks = sidebarMenu.filter(
    (item) => !item.comingSoon && item.path !== "/warehouse"
);

export default function Home() {
    // Abhi temporary naam. Baad me logged-in user (Redux) se aayega
    const userName = "Nikhil Gupta";

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (
        <div className="home-page">
            <section className="home-welcome">
                <p className="home-date">{today}</p>
                <h1>
                    {getGreeting()}, <span>{userName}</span>
                </h1>
                <p className="home-subtitle">Pick a module to get started.</p>
            </section>


            <section className="home-process">
                <img
                    src="/SupplyX_ From Farm to Feast.png"
                    alt="SupplyX From Farm to Feast"
                    decoding="async"
                />
            </section>
        </div>
    );
}