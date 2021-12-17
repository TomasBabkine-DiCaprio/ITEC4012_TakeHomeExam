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

    // Fetch posts from the database
    const [posts, setPosts] = useState([]);

    useEffect(
      () => {
        getPosts();
      }, []
    );

    const getPosts = async () => {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-takehome/databases/(default)/documents/users/');
      const data = await response.json();

      const formattedData = data.documents.map((item) => {
        return item.fields;
      });
    }

    return (
        <div className="homepage">
            <div className="title">
                <h1>Welcome to React Overflow!</h1>
                <h2>A tightknit community of devs helping each other in their React endeavours.</h2>
            </div>
        </div>
    )
}