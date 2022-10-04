import React, {useState} from "react"
import axios from "axios"

export const UserContext = React.createContext()


function UserProvider(props){

    const userAxios = axios.create()

    userAxios.interceptors.request.use(config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config
    })

    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || { },
        token: localStorage.getItem("token") || "",
        tasks: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)

    function handleAuthErr(errMsg) {
        setUserState(prevUserState => {
            return {
                ...prevUserState,
                errMsg
            }
        })
    }

    function resetAuthErr(){
        setUserState(prevUserState => {
            return {
                ...prevUserState,
                errMsg: ""
            }
        })
    }

    // function login(credentials){
    //     axios.post("/auth/login", credentials)
    //         .then(res => {
    //             const {user, token} = res.data
    //             localStorage.setItem("token", token)
    //             localStorage.setItem("user", JSON.stringify(user))
    //             setUserState(prevUserState => {
    //                 return {
    //                     ...prevUserState,
    //                     user,
    //                     token
    //                 }
    //             })
    //         })
    //         .catch(err => handleAuthErr(err.response.data.message))
    // }

const [loggedIn, setLoggedIn] = useState(false)
const [toggleForm, setToggleForm] = useState(false)
const [errMsg, setErrMsg] = useState("")
function logIn(){
    console.log("loggedIn")
    setToggleForm(true)
}

function logOut(){
    setLoggedIn(false)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("profilePic")
    setUserState( {
        user: {},
        token: "",
        profilePic: ""
    })

}

function toggleLogin(){
    setToggleForm(true)
}

function cancelLogin(){
    setToggleForm(false)
}

    function newLogin(credentials){
        console.log(credentials)
        axios.post("/auth/login", credentials)
        .then(res => {
            const {user, token, profilePic} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("profilePic", profilePic)
            setLoggedIn(true)
            setToggleForm(false)
            setUserState(prevUserState => {
                    return {
                        ...prevUserState,
                        user,
                        token
                    }
                })
            })
            .catch(err => setErrMsg(err.response.data.errMsg))
    }




    return (
        <UserContext.Provider value = {{
            ...userState,
            setToggleForm,
            userAxios,
            newLogin,
            resetAuthErr,
            handleAuthErr,
            loggedIn,
            toggleLogin,
            toggleForm,
            setLoggedIn,
            logIn,
            logOut,
            errMsg,
            cancelLogin
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider