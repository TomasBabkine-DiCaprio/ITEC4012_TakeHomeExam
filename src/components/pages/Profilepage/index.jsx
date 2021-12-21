import "./styles.css";
import { useEffect, useState, useContext } from 'react';
import { PostItem } from '../../PostItem';

// Firebase authentication
import { getAuth } from 'firebase/auth'; 
import { useHistory } from "react-router";

// Global contexts
import PostsContext from "../../../context/postsContext";

// New Post Form
import { useForm } from "react-hook-form";

import uuid from 'react-uuid';

export const ProfilePage = () => {

    const history = useHistory();

    // Current state, do we display the new post form or the user's posts
    const [action, setAction] = useState("viewPosts");

    const globalState = useContext(PostsContext);

    // Start by storing all the posts in the global context as the userPosts
    // I needed to do this, otherwise userPosts would render when not set yet and would return an error
    const [userPosts, setUserPosts] = useState(globalState.posts);

    // Get logged in user's email
    const auth = getAuth();
    const userEmail = auth.currentUser.email;

    // When the global context is updated (or first loaded), filter the user's posts
    useEffect(() => {
        filterUserPosts();
    }, [globalState]);

    // Filters all the posts in the global context and returns an array containing all the posts that the user posted
    const filterUserPosts = () => {

        // Filter all posts stored in the global context by user email
        const userPostsFiltered = globalState.posts.filter(
            (post) => {
                const email = post.user.stringValue.toLowerCase();
                const isMatch = email.indexOf(userEmail.trim().toLowerCase());

                return isMatch !== -1;
            }
        )

        // Set posts in the local state
        setUserPosts(userPostsFiltered);

    }

    // Handles user adding a new post
    const { register, handleSubmit } = useForm();
    const postNewPost = async(formVals) => {
        // Also add this user to the documents database, so that we can remember thair username and display it later!
        try {
            // Generate a new id for this user
            const postId = uuid();

            // Get the date and the time
            let newDate = new Date();

            // Format data from form
            const formattedData = {
                fields: {
                    id: {
                        stringValue: postId
                    }, 
                    user: {
                        stringValue: userEmail
                    },
                    text: {
                        stringValue: formVals.text
                    },
                    img: {
                        stringValue: formVals.img
                    },
                    date: {
                        timestampValue: newDate
                    }
                }
            }

            // add user infor to database
            const response = await fetch('https://firestore.googleapis.com/v1/projects/itec4012-takehome/databases/(default)/documents/posts/',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(formattedData)

            });

            history.push('/');

        } catch (error) {
            console.log("Error from Firebase", error)
        }
    }

    // render the new post form or the user's posts
    return (
        <div className="profilepage">
            <div className="textContainer">
                <h1>Hello, {userEmail}</h1>
            </div>
            {
                action === "viewPosts" && (
                <div>
                    <div className="newPostButtonContainer">
                        <button className="newPostButton" onClick={() => setAction("newPost")}>New Post</button>
                    </div>
                    <div className="postsContainer">
                    {
                        userPosts.map( (post) => (
                            <PostItem key={post.id.stringValue} user={post.user.stringValue} img={post.img.stringValue} text={post.text.stringValue} ></PostItem>
                        ))
                    }
                    {
                        userPosts.length === 0 && <p>You don't have any posts yet!</p>
                    }
                    </div>
                </div>
                )
            }

            {
                action === "newPost" && (
                <div>
                    <div className="newPostButtonContainer">
                        <button className="newPostButton" onClick={() => setAction("viewPosts")}>View Posts</button>
                    </div>
                    <div className="newPostContainer">
                        <form className="form-layout" onSubmit={handleSubmit(postNewPost)}>
                            <h2>Add a New Post</h2>

                            <div className="form-inputs">
                                <div className="form-input">
                                    <label htmlFor="text">Caption</label>
                                    <textarea type="text" rows="2" cols="25" name="text" required {...register('text')} />
                                </div>

                                <div className="form-input">
                                    <label htmlFor="img">Photo link</label>
                                    <input type="text" size="30" name="img" {...register('img')} />
                                </div>

                            </div>

                            <input type="submit" className="newPostSubmit" value="Submit post"></input>
                        </form>
                    </div>
                </div>
                )
            }
        </div>
    )
    
};