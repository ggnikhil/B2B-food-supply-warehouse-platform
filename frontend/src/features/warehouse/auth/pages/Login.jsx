import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router-dom";

import "../style/login.scss";

const Login = () => {

    const navigate = useNavigate()
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const { handleLogin } = useAuth();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await handleLogin(form);
        
        setForm({ email: "", password: "" })

        navigate("/warehouse")
    };

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1 className="login-title">Login</h1>

                <div className="login-field">
                    <label className="login-label" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        className="login-input"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your email ID"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="login-field">
                    <label className="login-label" htmlFor="password">
                        Password
                    </label>
                    <div className="login-password">
                        <input
                            id="password"
                            className="login-input"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                        />
                        <button
                            type="button"
                            className="login-eye"
                            aria-label="Show or hide password"
                            onClick={() => setShowPassword((p) => !p)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {error && <div className="login-error">{error}</div>}

                <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? "Please wait..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;