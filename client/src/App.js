import React, {useContext} from "react"
import {Routes, Route, Navigate} from "react-router-dom"
import Home from "./components/Home"
import Projects from "./components/Projects"
import Supplies from "./components/Supplies";
import SupplyDetail from "./components/SupplyDetail";
import Navbar from "./components/Navbar";
import { UserContext } from "./components/UserContext";
import Profile from "./components/Profile"
import Chores from "./components/Chores";


function App() {

  const {token} = useContext(UserContext)

  return (
    <> 
      <div className = "app-container">
        <Navbar /> 

        <Routes>
            <Route path = "/" element = {<Home />} />
            <Route path = "/projects" element = {token ? <Projects /> : <Navigate replace to = "/" />}  />
            <Route path = "/supplies" element = {token ? <Supplies /> : <Navigate replace to = "/" /> } />
            <Route path = "/supplies/:supplyId" element = {token ? <SupplyDetail /> : <Navigate replace to = "/" />} />
            <Route path = "/profile" element = {token ? <Profile /> : <Navigate replace to = "/" />} />
            <Route path = "/chores" element = {token ? <Chores /> : <Navigate replace to = "/" /> } />
          </Routes>
      </div>
      
  

      
    </>
  )
}

export default App;
