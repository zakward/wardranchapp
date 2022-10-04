import { React, useState, useEffect } from "react"
import axios from "axios"
import Supply from "./Supply.js"
import Navbar from "./Navbar"
import SupplyDetail from "./SupplyDetail.js"
import SuppliesTable from "./SuppliesTable.js"

function Supplies() {



    const [ recurringSupplies, setRecurringSupplies ] = useState([ 
        {
            item : "",
            locationName: "",
            locationLink: "",
            price: null,
            dateOfPurchase: "",
            quanity: "",
            purchaseTotal : null,
            imgUrl: "",
            urgent: ""
        }
    ])

    useEffect(() => {
        axios.get("/api/supplies")
        .then(res => setRecurringSupplies(res.data))
        .catch(err => console.log(err))
    }, [])

    const [ toggleSupplyView, setToggleSupplyView] = useState(false)
    const [ toggleSpreadsheet, setToggleSpreadsheet] = useState(false)


    // useEffect(() => {
    //     axios.get("/supplies")
    //         .then(res => setRecurringSupplies(res.data))
    //         .catch(err => console.log(err))
    // }, [])

    console.log(recurringSupplies)

    function getSupplies() {
        setToggleSupplyView(true)
        setToggleSpreadsheet(false)
        axios.get("/api/supplies")
        .then(res => setRecurringSupplies(res.data))
        .catch(err => console.log(err))
    }

    const supplyElements = recurringSupplies.map(supply => {
        return <Supply supply = {supply} />
    })

    function getUrgentSupplies() {
        setToggleSpreadsheet(false)
        setToggleSupplyView(true)
        axios.get("/api/supplies/search/urgent?urgent=true")
            .then(res => setRecurringSupplies(res.data))
            .catch(err => console.log(err))
    }

    function getSpreadsheet() {
        
        setToggleSpreadsheet(true)
        setToggleSupplyView(false)
        axios.get("/api/supplies")
            .then(res => setRecurringSupplies(res.data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className = "supplies-wrapper">
                 <div className = "supplies-container">
                    
                 </div>
                 <h1 className = "supplies-header">Supplies</h1>
                 <div className = "button-div">
                    <button className = "supply-btn"onClick = {getSupplies}>VIEW RECURRING SUPPLIES</button>
                    <button className = "supply-btn" onClick = {getUrgentSupplies}>VIEW URGENT SUPPLIES</button>
                    <button className = "supply-btn" onClick = {getSpreadsheet}>VIEW SPREADSHEET</button>
                 </div> 
                 <button>Add Supply</button>
                 <div className = "supply-elements-container">
                   {toggleSupplyView ? supplyElements : <></>}
                   {toggleSpreadsheet ? <SuppliesTable data = {recurringSupplies} /> : <></>}
                 </div>
            </div>               


        </>
    )
}

export default Supplies