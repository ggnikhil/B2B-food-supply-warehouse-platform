import React, { useState } from "react";
import { useAuth } from "../hook/useAuth";

import {
    Eye,
    EyeOff,
    Camera,
    UserRound
} from "lucide-react";
import "../style/register.scss";

const initialForm = {
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    role: "WORKER",
    department: "",
    warehouseCode: "WH-MUM3",
    shiftHour: "9hr",
    profilePhoto: null,
    joiningDate: "",
};

const RegisterFrom = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [profilePreview, setProfilePreview] = useState(null);
    const [fromdata, setfromdata] = useState(initialForm);

    const {handleRegister} = useAuth()

    const handleChange = (e) => {
        const { name, value } = e.target;

        setfromdata((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfilePhoto = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            e.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Image size must be less than 2 MB.");
            e.target.value = "";
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setProfilePreview(imageUrl);
        setfromdata((prev) => ({
            ...prev,
            profilePhoto: file
        }));
    };

    const handleReset = () => {
        setfromdata(initialForm);
        setShowPassword(false);
        setProfilePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        handleRegister(fromdata)
        setfromdata(initialForm)
    };

    return (
        <form
            className="register-card"
            onSubmit={handleSubmit}
            onReset={handleReset}
        >

            <label className="register-field">
                <span>
                    Name <b>*</b>
                </span>

                <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={fromdata.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                />
            </label>


            <label className="register-field">
                <span>
                    Phone Number <b>*</b>
                </span>

                <div className="register-prefix">
                    <em>+91</em>

                    <input
                        className="form-input"
                        type="tel"
                        name="contactNumber"
                        value={fromdata.contactNumber}
                        onChange={handleChange}
                        placeholder="10 digit number"
                        inputMode="numeric"
                        maxLength={10}
                        required
                    />
                </div>
            </label>


            <label className="register-field">
                <span>
                    Email <b>*</b>
                </span>

                <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={fromdata.email}
                    onChange={handleChange}
                    placeholder="name@gmail.com"
                    required
                />
            </label>


            <label className="register-field">
                <span>
                    Password <b>*</b>
                </span>

                <div className="register-password">

                    <input
                        className="form-input"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={fromdata.password}
                        onChange={handleChange}
                        placeholder="Min 8 characters"
                        minLength={8}
                        required
                    />

                    <button
                        type="button"
                        className="register-eye"
                        onClick={() =>
                            setShowPassword((prev) => !prev)
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={16} />
                        ) : (
                            <Eye size={16} />
                        )}
                    </button>

                </div>
            </label>


            <label className="register-field">
                <span>Warehouse</span>

                <input
                    className="form-input"
                    type="text"
                    name="warehouseCode"
                    value={fromdata.warehouseCode}
                    disabled
                    readOnly
                />
            </label>


            <label className="register-field">
                <span>
                    Role <b>*</b>
                </span>

                <select
                    className="form-select"
                    name="role"
                    value={fromdata.role}
                    onChange={handleChange}
                    required
                >
                    <option value="WORKER">
                        Worker
                    </option>

                    <option value="SUPERVISOR">
                        Supervisor
                    </option>
                </select>
            </label>


            {fromdata.role === "WORKER" && (
                <label className="register-field">
                    <span>
                        Department <b>*</b>
                    </span>

                    <select
                        className="form-select"
                        name="department"
                        value={fromdata.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Select department
                        </option>

                        <option value="PICKER">
                            Picker
                        </option>

                        <option value="CHECKER">
                            Checker
                        </option>

                        <option value="LOADER">
                            Loader
                        </option>

                        <option value="DISPATCHER">
                            Dispatcher
                        </option>
                    </select>
                </label>
            )}


            <label className="register-field">
                <span>
                    Shift Hour <b>*</b>
                </span>

                <select
                    className="form-select"
                    name="shiftHour"
                    value={fromdata.shiftHour}
                    onChange={handleChange}
                    required
                >
                    <option value="9hr">
                        9 hr
                    </option>

                    <option value="12hr">
                        12 hr
                    </option>

                    <option value="Depends">
                        Depends
                    </option>
                </select>
            </label>



            <div className="register-photo-field">

                <span className="register-photo-label">
                    Profile Photo
                </span>

                <div className="register-photo">

                    <label className="register-avatar">

                        {profilePreview ? (
                            <img
                                src={profilePreview}
                                alt="Profile preview"
                            />
                        ) : (
                            <>
                                <UserRound size={28} />
                                <span>Upload Photo</span>
                            </>
                        )}

                        <input
                            type="file"
                            name="profilePhoto"
                            accept="image/png, image/jpeg"
                            onChange={handleProfilePhoto}
                            hidden
                        />

                    </label>

                    <div className="register-photo-info">
                        <small>
                            JPG ya PNG, max 2 MB
                        </small>
                    </div>

                </div>

            </div>



            <div className="register-actions">

                <button
                    type="reset"
                    className="btn-secondary"
                >
                    Reset
                </button>

                <button
                    type="submit"
                    className="btn-primary"
                >
                    Save Details
                </button>

            </div>

        </form>
    );
};

export default RegisterFrom;