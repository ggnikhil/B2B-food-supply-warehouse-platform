import React, { useState } from "react";
import {
    LuTruck,
    LuSearch,
    LuShoppingCart,
    LuHeart
} from "react-icons/lu";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";

import "../style/navbar.scss";

const Navbar = () => {

    const [searchInput, setSearchInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const query = searchInput.trim();

        if (query) {
            console.log("Searching:", query);
        }
    };

    return (
        <header className="navbar">

            <div className="navbar__left">

                <a href="/" className="navbar__logo">
                    supply<span>X</span>
                </a>

                <div className="navbar__delivery">

                    <div className="navbar__delivery-title">
                        <LuTruck />
                        <span>Delivery tomorrow</span>
                    </div>

                    <p className="navbar__delivery-sub">
                        <b>Guest Outlet:</b> Mumbai, Maharashtra, India
                    </p>

                </div>

            </div>

            <form
                className="navbar__search"
                onSubmit={handleSubmit}
            >
                <LuSearch />

                <input
                    type="text"
                    placeholder="Search items or categories"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    aria-label="Search items or categories"
                />
            </form>

            <div className="navbar__actions">

                <button
                    className="navbar__btn navbar__btn--cart"
                    aria-label="Cart"
                >
                    <LuShoppingCart />
                </button>

                <button
                    className="navbar__btn"
                    aria-label="Wishlist"
                >
                    <LuHeart />
                </button>

                <button
                    className="navbar__btn"
                    aria-label="Menu"
                >
                    <HiOutlineBars3BottomRight />
                </button>

            </div>

        </header>
    );
};

export default Navbar;