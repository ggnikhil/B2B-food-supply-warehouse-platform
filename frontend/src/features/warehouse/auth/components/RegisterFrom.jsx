import React, { useState } from "react";
import {
    Eye,
    EyeOff,
    Camera,
    UserRound
} from "lucide-react";
import "../style/register.scss";

const RegisterFrom = () => {

    const [role, setRole] = useState("WORKER");
    const [showPassword, setShowPassword] = useState(false);
    const [profilePreview, setProfilePreview] = useState(null);

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
    };

    const handleReset = () => {
        setRole("WORKER");
        setShowPassword(false);
        setProfilePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Register form submitted");
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
                    value="WH-MUM3"
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
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
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


            {role === "WORKER" && (
                <label className="register-field">
                    <span>
                        Department <b>*</b>
                    </span>

                    <select
                        className="form-select"
                        name="department"
                        defaultValue=""
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
                    defaultValue="9hr"
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