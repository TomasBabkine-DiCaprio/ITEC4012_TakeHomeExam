import "./styles.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

// Import firebase authentication
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Import react-uuid
import uuid from 'react-uuid';

export const LoginPage = () => {

    // Email and password
    // TomasBabkineDiCaprio@cmail.carleton.ca
    // Tomas123

    // History
    const history = useHistory();

    // Log in or signup state
    const [ action, setAction ] = useState("login")

    // Register form
    const { register, handleSubmit } = useForm();

    // Handle loginUser form
    const loginUser = async(formVals) => {

        try {
            const auth = getAuth();

            const loginUser = await signInWithEmailAndPassword(auth, formVals.email, formVals.password);

            // Redirect user to homepage
            history.push('/');
        } catch (error) {
            console.log("Error from Firebase", error)
        }

    }

    // Handles signup form
    const signUpUser = async(formVals) => {
        console.log("Sign up user", formVals);
        const auth = getAuth();

        // create user in authentication
        try {
            const signUpUser = await createUserWithEmailAndPassword(auth, formVals.email, formVals.password);
            console.log("New user was created", signUpUser);

            history.push('/');
        } catch (error) {
            console.log("Error from Firebase", error)
        }

    }

    return (
        <div className="loginpage">
            {
                // Login form
                action === "login" && (
                    <form className="form-layout" onSubmit={handleSubmit(loginUser)}>
                        <h1>Welcome back, please sign in</h1>

                        <div className="form-inputs">
                            <div className="form-input">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" required {...register('email')} />
                            </div>

                            <div className="form-input">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" required {...register('password')} />
                            </div>
                        </div>

                        <input type="submit" className="loginButton" value="Login"></input>
                        
                        <div className="signup"> 
                            <p>Don't have an account yet?</p>
                            <p>Create a new account with your email and password</p>
                            <button className="signupButton" onClick={() => setAction("signup")}>Sign Up</button>
                        </div>
                    </form>
                )
            }

            {
                // Register form
                action === "signup" && (
                    <form className="form-layout" onSubmit={handleSubmit(signUpUser)}>
                        <h1>Create an account</h1>

                        <div className="form-inputs">
                            <div className="form-input">
                                <label htmlFor="email">Email</label>
                                <input type="email" required name="email" required {...register('email')} />
                            </div>

                            <div className="form-input">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" required {...register('password')} />
                            </div>
                            
                            <div className="form-input">
                                <label htmlFor="passwordConfirm">Confirm Password</label>
                                <input type="password" name="passwordConfirm" required {...register('passwordConfirm')} />
                            </div>

                        </div>
                        
                        <input type="submit" className="signupButton" value="Sign Up"></input>
                        
                        <div className="signup"> 
                            <p>Have an account already?</p>
                            <button className="loginButton" onClick={() => setAction("login")}>Login</button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}