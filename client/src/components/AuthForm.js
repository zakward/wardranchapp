import { React, useState, useContext } from "react"
import {UserContext} from "./UserContext"

function AuthForm({newLogin}){

    const {errMsg, cancelLogin} = useContext(UserContext)

    const initInputs = {
        username: "",
        password: ""
    }

    const [inputs, setInputs] = useState(initInputs)

    function alertZak() {
    alert("Just call Zak!")
    }

    function handleChange(e) {
        const {name, value } = e.target
        setInputs(prevInputs => {
            return {
                ...prevInputs,
                [name]: value
            }
        })
    }

    function handleLogin(e){
        e.preventDefault()
        newLogin(inputs)

    }

    function handleCancelLogin(){
        cancelLogin()
    }

    return (
        <>
        <div className = "auth-form">
        <h3>Log In</h3>

        <form>
            <label>Username</label>
            <input 
            type = "text"
            placeholder="Enter your username"
            name = "username"
            value = {inputs.username}
            onChange = {handleChange}
            />
            <label>Password</label>
            <input 
            type = "password"
            placeholder="password"
            name = "password"
            value = {inputs.password}
            onChange = {handleChange}
            />
            <p onClick = {alertZak}>Forgot Password?</p>
            <button onClick = {handleLogin}>LogIn</button>
            <button onClick = {handleCancelLogin}>Cancel</button>
            <p className = "errMsg">{errMsg}</p>
        </form>
        </div>
        </>
        

    )
}

export default AuthForm