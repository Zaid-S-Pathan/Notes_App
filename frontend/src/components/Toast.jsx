import { useEffect } from "react";
import "../styles/Toast.css";

function Toast({ message, type = "info", onClose, duration = 2500 }) {
    useEffect(() => {
        const timer = setTimeout(() => onClose && onClose(), duration);
        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!message) return null;

    return (
        <div className={`toast toast-${type}`} role="status" aria-live="polite">
            {message}
        </div>
    );
}

export default Toast;




