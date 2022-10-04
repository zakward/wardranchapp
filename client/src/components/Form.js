import { React, useState } from "react"

function Form(props) {

    const [input, setInput ] = useState({
        location: "",
        title: "",
        priority: "",
        isComplete: false,
        priority: ""
    })



    function handleChangeInput(e) {
        const {name, value} = e.target
        setInput(prevInput => {
            return {
                ...prevInput,
                [name] : value
            }
        })
    }
    
    

    function handleSaveInput(e){
        e.preventDefault()
        props.addProject(input)
        console.log(input)
    }

    return (
        <>
        <form className = "task-form">
            <h3>ADD PROJECT</h3>
            <input className = "form-input" placeholder="--- project ---" name = "title" value = {input.title} onChange = {handleChangeInput}/>
             <select className = "form-input" name = "location" value = {input.location} onChange = {handleChangeInput}>
             <option>--- Select Location ---</option>
                <option className = "location-opt" value = "Inside">Inside</option>
                <option className = "location-opt" value = "Outside">Outside</option>
             </select>
            
            <select className = "form-input" value = {input.priority} name = "priority" onChange = {handleChangeInput}>
                <option>--- Select Priority ---</option>
                <option value = "Very High" >High Priority</option>
                <option value = "none" >No Priority</option>
            </select>
            <select className = "form-input" onChange = {handleChangeInput} name ="assignedTo" value = {input.assignedTo}>
                        <option >---Assign Project to  ---</option>
                        <option value = "All">All</option>
                        <option value = "No One">No One</option>
                        <option value = "Any One">Any One</option>
                        <option value = "Zak">Zak</option>
                        <option value = "Rebecca">Rebecca</option>
                        <option value = "Kids">Kids</option>
                        <option value = "Pops">Pops</option>
                        <option value = "Grandma Alicia">Grandma Alicia</option>
                        <option value = "GiGi">GiGi</option>
                        <option value = "Papa">PaPa</option>
            </select>
            <button className = "form-submit-btn"onClick = {handleSaveInput}>SUBMIT PROJECT</button>
            <button className = "form-cancel-btn" onClick = {props.cancel} >Cancel</button>
        </form>
        </>
    )
}

export default Form