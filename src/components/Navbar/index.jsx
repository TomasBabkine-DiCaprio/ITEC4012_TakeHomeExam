import "./styles.css";

import {
    NavLink
} from "react-router-dom";

// Import the logout button
import { Logout } from "../Logout";

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { useState, useEffect } from "react";

export const Navbar = () => {

    // If user is logged in, then display the home page and new posts button
    // If not, don't
    //const auth = getAuth();
    const [loggedIn, setLoggedIn] = useState(false);

    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //     user ? setLoggedIn(true) : setLoggedIn(false);
    // });

    useEffect(
      () => {
        const auth = getAuth();
        let subscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setLoggedIn(true);
          } else {
            setLoggedIn(null);
          }
        })
        return () => {
            subscribe.unsubscribe();
        }
      }, []
    );
    
    return(
        <nav className="navbar">
            <div className="logo">
                <img src="https://i.postimg.cc/Hj1gBHz8/overflow-logo.png" alt="react_overflow_logo" />
            </div>
            {
                loggedIn == true && (
                    <ul className="navbar-list">
                        <li>
                            <NavLink exact={true} activeClassName="nav-selected" to="/"><h1>Home Page</h1></NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="nav-selected" to="/me"><h1>My Profile</h1></NavLink>
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </ul>
                )
            }
            
        </nav>
    )
}