import React, { useEffect, useState } from "react";
import Register from "./views/Register";
import Login from "./views/Login";
import Albums from "./views/Albums";
import "./App.css";

const App = () => {
    // When the app first renders, no user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUserId, setCurrentUserId] = useState("");
    const [showLogin, setShowLogin] = useState(true);
    const [token, setToken] = useState(false);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("data"));
        if (data && data.token && data.id && data.expiry) {
            const tokenExpiry = new Date(data.expiry);
            const now = new Date();

            if (tokenExpiry > now) {
                login(data.token, data.id);
            } else {
                logout();
            }
        } else{
            logout();
        }
    }, [])

    const login = (token, id) => {
        setToken(token);
        setCurrentUserId(id);
        setIsLoggedIn(true);
    }

    const logout = () => {
        localStorage.removeItem("data")
        setToken(false);
        setCurrentUserId("");
        setIsLoggedIn(false);
        setShowLogin(true);
    }

    const deregister = async () => {
        const settings = {
            method: "DELETE",
            headers: {
                "authorisation": "Bearer " + token
            }
        }
 
    // const usersData = () => {
   
    // }
        // Let's pretend the current user has an id of 1234abcd
        // The DELETE request will be sent to:
        // http://localhost:3001/users/1234abcd
        const response = await fetch(process.env.REACT_APP_SERVER_URL + `/users/${currentUserId}`, settings);
        const parsedRes = await response.json();

        try {
            if (response.ok) {
                alert(parsedRes.message);
                setIsLoggedIn(false);
                setShowLogin(true);
                setCurrentUserId("");
            } else {
                throw new Error(parsedRes.message);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    // If no user is currently logged in
    if (!isLoggedIn) {
        // Display the login view
        if (showLogin) {
            return <Login setShowLogin={setShowLogin} login={login} />
            // Display the register view
        } else {
            return <Register setsetShowLogin={setShowLogin} login={login} />
        }
        // Else, if a user is logged in, display the "albums" page for that user
    } else {
        return <Albums token={token} currentUserId={currentUserId} logout={logout} deregister={deregister}   />
    }
}

export default App;