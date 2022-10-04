import { React, useState, useContext } from "react"
import {Link} from "react-router-dom"
import arrowDown from "./arrowDown.png"
import arrowUp from "./arrowUp.png"
import "../newTheme.css"
import menu from "../menu.png"
import { UserContext } from "./UserContext"
import userImg from "./user.png"

function Navbar() {

    const {user: {profilePic}, loggedIn, setLoggedIn, logIn, logOut} = useContext(UserContext)

    console.log({profilePic})

    const [showMenu, setShowMenu] = useState(false)

    function handleDropDown(){
    

            setShowMenu(!showMenu)
    }

    

    // if (showMenu === true) {
    //     document.addEventListener("click", handleDropDown)
    // }

    return (
        <>

        <nav className = "newNav-container">
            <ul className = "nav-list">
                <li>
                    <img onClick = {handleDropDown} src = {menu} className = "menu-img" alt = "navimage" />
                    <div id = "myDropdown" className = {showMenu ? "dropdown-content2" : "dropdown-content2-hidden"}>
                        <button className = "close-menu" onClick={handleDropDown}>X</button>
                        <Link onClick = {handleDropDown} className = "nav-item2" to = "/">HOME</Link>
                        <Link onClick = {handleDropDown }className = "nav-item2" to = "/projects">PROJECTS</Link>
                        <Link onClick = {handleDropDown} className = "nav-item2" to = "/supplies">SUPPLIES</Link>
                        <Link onClick = {handleDropDown} className = "nav-item2" to = "/profile">PROFILE</Link>
                        <Link onClick = {handleDropDown} className = "nav-item2" to = "/chores">CHORES</Link>
                    <img alt = "arrow-up" className = "arrow-up" onClick = {handleDropDown} src = {arrowUp} />
                    </div>
                </li>
                <li>Ward Family Ranch</li>
                {loggedIn ? <button onClick = {logOut} className = "auth-login">Log Out</button> : <button onClick = {logIn} className = "auth-login">Log In</button>}
                <li>{loggedIn ? <img className = "profile-pic" alt = "profilePic" src = {profilePic} /> : <img className = "profile-pic noUser"src = {userImg} alt = "randomUser" /> }</li>
            </ul>
        </nav>
            {/* <div className="nav-list">
            <button onClick = {handleDropDown}className = "drop-btn">MENU : <img onClick = {handleDropDown} alt = "arrow-down" className = "arrow-down" src = {showMenu ? arrowUp : arrowDown} /></button>
                <div id = "myDropdown" className = {showMenu ? "dropdown-content" : "dropdown-content-hidden"}>
                    <Link className = "nav-item" to = "/">HOME</Link>
                    <Link className = "nav-item" to = "/projects">PROJECTS</Link>
                    <Link className = "nav-item" to = "/supplies">SUPPLIES</Link>
                    <img alt = "arrow-up" className = "arrow-up" onClick = {handleDropDown} src = {arrowUp} />
                </div> 
                
            
            </div> */}
        </>
    )
}

export default Navbar