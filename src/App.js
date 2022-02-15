import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logout, login, selectUser } from './features/userSlice';


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Logged in
        console.log(user);
        dispatch(login({
          uid: user.uid,
          email: user.email,
        }));
      } else {
        // Logged out
        dispatch(logout);
      }
    });

    return unubscribe;
  }, [dispatch])
  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ): (
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
