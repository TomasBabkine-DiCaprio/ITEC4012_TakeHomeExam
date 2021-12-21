import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; 
import { useEffect, useState } from 'react';

import { useHistory } from "react-router";

export const Logout = () => {

  const history = useHistory();

  const [user, setUser] = useState(null);

  // Check if current user is logged in
  useEffect(
    () => {
      const auth = getAuth();
      let unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      })

      // Stop listening to the state change
      return () => {
          unsubscribe();
      }
    }, []
  );

  const logoutUser = async() => {
    const auth = getAuth();

    try {
      await signOut(auth);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    user && <button className="logout-btn" onClick={logoutUser}>
      <h1>Logout</h1>
    </button>
  )
}