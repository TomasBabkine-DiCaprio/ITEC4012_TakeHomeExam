import "./styles.css";
import { useEffect, useState, useContext } from 'react';
import { PostItem } from '../../PostItem';

// Firebase authentication
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { useHistory } from "react-router";

// Global contexts
import PostsContext from "../../../context/postsContext";

export const HomePage = () => {

  // Loading state
  const [loading, setLoading] = useState([]);

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

  // Update the global context with posts when the API is updated
  const globalContext = useContext(PostsContext);

  useEffect(
    () => {
      globalContext.initializePosts(posts);
    }, [posts]
  );

  // get posts from the api
  const getPosts = async () => {

    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-takehome/databases/(default)/documents/posts/');
      const data = await response.json();

      const formattedPostsData = data.documents.map((item) => {
        return item.fields;
      });

      // Update local state
      setPosts(formattedPostsData);

      // Update global state with posts
      globalContext.initializePosts(formattedPostsData);

      // Loading state
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }

  return (
    <div className="homepage">
      <div className="title">
          <h1>Welcome to React Overflow!</h1>
          <h2>A tightknit community of devs helping each other in their React endeavours.</h2>
      </div>
      <div className="postsContainer">
        {
          posts.map((item) => (
            <PostItem key={item.id.stringValue} user={item.user.stringValue} img={item.img.stringValue} text={item.text.stringValue} ></PostItem>
          ))
        }
        {
          loading && <p>Loading data...</p>
        }
      </div>
    </div>
  )
}