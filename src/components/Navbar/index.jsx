import "./styles.css";

import {
    NavLink
} from "react-router-dom";

export const Navbar = () => {
    return(
        <nav className="navbar">
            <div className="logo">
                <img src="https://i.postimg.cc/Hj1gBHz8/overflow-logo.png" alt="react_overflow_logo" />
            </div>
            <ul className="navbar-list">
                <li>
                    <NavLink exact={true} activeClassName="nav-selected" to="/"><h1>Home Page</h1></NavLink>
                </li>
                <li>
                    <NavLink activeClassName="nav-selected" to="/me"><h1>My Profile</h1></NavLink>
                </li>
                <li>
                    <NavLink activeClassName="nav-selected" to="/logout"><h1>Logout</h1></NavLink>
                </li>
            </ul>
        </nav>
    )
}