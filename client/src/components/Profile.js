import {React, useContext} from "react"
import { UserContext } from "./UserContext"

export default function Profile(){


    const {user: {profilePic}} = useContext(UserContext)

    return(
        <>
            <div className = "profile-container">
                <img className = "profile-background" alt = "background" src = "https://images.unsplash.com/photo-1602604933301-88232da485a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1516&q=80"/>
                <img src = {profilePic} className = "profile-page-img" alt = "profilePic"/>
                <h1>Profile page</h1> 
                <h1>This page is currently under construction! Try again later!</h1>
            </div>
            
        </>
    )
}