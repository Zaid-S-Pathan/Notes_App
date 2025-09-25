import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
import Toast from "./Toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [toast, setToast] = useState({ message: "", type: "info" });
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            setError("");
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                setToast({ message: "Welcome back!", type: "success" });
                navigate("/")
            } else {
                setToast({ message: "Registration successful. Please log in.", type: "success" });
                navigate("/login")
            }
        } catch (error) {
            const message = error?.response?.data?.detail || error?.response?.data || error.message || "Request failed";
            setError(typeof message === "string" ? message : JSON.stringify(message));
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            {error && <div className="form-error" role="alert">{error}</div>}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <div className="password-input-container">
                <input
                    className="form-input password-input"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
            </div>
            {loading && <LoadingIndicator />}
            <button className="form-button" type="submit" disabled={loading || !username || !password}>
                {name}
            </button>
            {method === "login" && (
                <p className="auth-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            )}
            {method === "register" && (
                <p className="auth-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            )}
            <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "info" })} />
        </form>
    );
}

export default Form