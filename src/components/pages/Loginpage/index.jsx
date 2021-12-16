import "./styles.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

// Import firebase authentication
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

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
            console.log("Login submitted", formVals);
            const auth = getAuth();

            const loginUser = await signInWithEmailAndPassword(auth, formVals.user, formVals.password);

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

        try {
            const signUpUser = await createUserWithEmailAndPassword(auth, formVals.user, formVals.password);
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
                        <h1>Welcome back, please sign in!</h1>
                        <br />

                        <label htmlFor="user">Username</label>
                        <input type="email" name="user" required {...register('user')} />
                        <br />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required {...register('password')} />
                        <br />
                        <br />
                        <input type="submit" value="Login"></input>
                        <br />
                        <p>Don't have an account with us yet? Create a new account with your email and password</p>
                        <button onClick={() => setAction("signup")}>Sign Up</button>
                    </form>
                )
            }

            {
                // Register form
                action === "signup" && (
                    <form className="form-layout" onSubmit={handleSubmit(signUpUser)}>
                        <h1>Create an account now!</h1>
                        <br />

                        <label htmlFor="user">Email</label>
                        <input type="email" required name="user" required {...register('user')} />
                        <br />
                        <br />
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required {...register('password')} />
                        <br />
                        <br />
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input type="password" name="passwordConfirm" required {...register('passwordConfirm')} />
                        <br />
                        <br />
                        <input type="submit" value="Sign Up"></input>
                        <br />
                        <p>Have an account already?</p>
                        <button onClick={() => setAction("login")}>Login</button>
                    </form>
                )
            }
        </div>
    )
}