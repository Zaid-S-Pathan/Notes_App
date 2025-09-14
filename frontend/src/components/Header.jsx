import { Link } from "react-router-dom";
import "../styles/Home.css";

function Header() {
    return (
        <nav className="app-header">
            <div className="app-header-left">
                <Link to="/" className="navbar-brand">📝 My Notes</Link>
            </div>
            <div className="app-header-right">
                <Link to="/logout" className="btn-logout">Logout</Link>
            </div>
        </nav>
    );
}

export default Header;


