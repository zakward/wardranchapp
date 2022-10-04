import React, {useState, useContext} from "react"
import Navbar from "./Navbar"
import AuthForm from "./AuthForm"
import axios from "axios"
import { UserContext } from "./UserContext"

function Home() {

    const { user: {username},
        setToggleForm,
        userAxios,
        newLogin,
        resetAuthErr,
        handleAuthErr,
        loggedIn,
        toggleLogin, toggleForm} = useContext(UserContext)

        // userAxios

   
    

    return (
        <div className = "home-container">
            <div className = "main-header">
                <h3 id = "title" >Our Adventure App</h3>
            </div>
            <h3 className = "welcome-msg">Welcome {loggedIn ? username : "familia"}!</h3>
            {toggleForm ? <AuthForm newLogin = {newLogin}  /> : <></>}
        </div>
    )
}

export default Home