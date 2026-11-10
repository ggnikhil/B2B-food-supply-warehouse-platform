import React from "react";
import "../style/header.scss"

const Header = () => {
    const warehouseCode = "WH-MUM3";
    const userName = "Nikhil Gupta";
    const userProfile = "https://ik.imagekit.io/nikhil29/image_zY_EyO36K.jpg?updatedAt=1770757037428";

    return (
        <div className="header-container">

            {/* Left Section */}
            <div className="header-left">

                <div className="header-logo">
                    <img
                        src="/Supplyx Logo with Blue Accent.png"
                        alt="SupplyX"
                    />
                </div>

                <div className="warehouse-code">
                    {warehouseCode}
                </div>

            </div>

            {/* Right Section */}
            <div className="header-right">

                <div className="user-profile">

                    <img
                        src={userProfile}
                        alt={userName}
                        className="user-avatar"
                    />

                    <span className="user-name">
                        {userName}
                    </span>

                </div>

            </div>

        </div>
    );
};

export default Header;