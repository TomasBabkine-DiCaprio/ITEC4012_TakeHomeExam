import React, { useState } from 'react';

const PostsContext = React.createContext({
  posts: [],
  initializePosts: () => {}
});

export const PostsContextProvider = (props) => {

  const [posts, setPosts] = useState([]);

  const initializePosts = (postsFromAPI) => {
    setPosts(postsFromAPI);
  }

  return (
    <PostsContext.Provider
      value={{ posts: posts, initializePosts: initializePosts }}
    >
      {props.children}
    </PostsContext.Provider>
  )
}

export default PostsContext;
