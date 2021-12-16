import "./styles.css";
import { useEffect, useState, useContext } from 'react';

// Firebase authentication
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { useHistory } from "react-router";

export const HomePage = () => {

    // Check if current user is logged in
    const history = useHistory();
    useEffect (
      () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (!user) {
              history.push('/login');
          }
        })
      }, []
    );

    return (
        <div className="homepage">
            <div className="title">
                <h1>Welcome to React Overflow!</h1>
                <h2>A tightknit community of devs helping each other in their React endeavours.</h2>
            </div>
        </div>
    )
}