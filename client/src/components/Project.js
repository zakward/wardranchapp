import axios from "axios"
import { React, useState } from"react"
import pushpin from "./pushpin.png"
import checkmark from "./checkmark.png"


function Project(props) {

const [isComplete, setIsComplete] = useState({
    isComplete: props.isComplete
})

// useEffect(() => {
//  if(props.isComplete === true) {
//         console.log("it'scomplete")
//         setIsComplete({
//             isComplete: true
//         })
//     } 
//     else {
//         console.log("its not complete")
//         setIsComplete({
//             isComplete:  false
//         })
//     }
// }, [])
   
    
    console.log(isComplete)

    

    const [assignedState, setAssignedState] = useState({
        assignedTo: ""
    })

    const [isCompletedTrue, setIsCompletedTrue] = useState({
        isComplete: true
    })

    const [isCompletedFalse, setIsCompletedFalse] = useState({
        isComplete: false
    })


    const [editAssignedTask, setEditAssignedTask] = useState(false)

    const [editFormToggle, setEditFormToggle] = useState(false)

    const [editInput, setEditInput] = useState({
        location: props.location,
        title: props.title
    })


    function handleDeleteTask(e) {
        e.preventDefault()
        props.delete(props._id)
    }

    function handleAssignTaskChange(e) {
        const {name, value} = e.target
        setAssignedState({[name] : value})
    }

    function handleAssignTaskSave(e) {
        e.preventDefault()
        setEditAssignedTask(false)
        props.editAssignProject(props._id, assignedState)
    }

  function handleCompletedChange(e){
    if (e.target.checked) {
        setIsComplete({
            isComplete: true
        })
        console.log(isComplete)
        axios.put(`/tasks/${props._id}`, isCompletedTrue)
            .then(res => props.getTasks())
            .catch(err => console.log(err))

    } 
    else {
        setIsComplete({
            isComplete: false
        })
        axios.put(`tasks/${props._id}`, isCompletedFalse)
            .then(res => props.getTasks())
            .catch(err => console.log(err))
    }
  }

  function handleEditSave() {
    console.log("the edit save button was pressed")
    setEditFormToggle(false)
    axios.put(`/tasks/${props._id}`, editInput)
        .then(res => props.getProjects())
        .catch(err => console.log(err))
  }
    
 function handleEditChange(e) {
    const {name, value} = e.target
    setEditInput(prevInput => {
        return {
            ...prevInput,
            [name] : value
        }
    })
  }

  

console.log(editInput)

    return (
        <>
            <div className  = "task-card">
                <button onClick = {handleDeleteTask} className = "delete-btn">X</button>
               { isComplete.isComplete === true   ? <img src = {checkmark} className = "checkmark" /> : <></> }
            {props.priority=== "Very High" ? <img className = "task-img" src = {pushpin} /> : <p className = "no-priority">no priority</p>}
           
                {editFormToggle ?    <select className = "form-input" name = "location" value = {editInput.location} onChange = {handleEditChange}>
                            <option>--- Select Location ---</option>
                            <option className = "location-opt" value = "Inside">Inside</option>
                            <option className = "location-opt" value = "Outside">Outside</option>
             </select> 
             
             : 
             
             <h3 className = "task-location">LOCATION :     <span className = "assign-name">{props.location}</span></h3>}
                {editFormToggle ? <input type = "text" className = "form-input" name = "title" maxLength={50} onChange = {handleEditChange} value = {editInput.title} /> : <h3 className = "task-title">PROJECT:    <span className = "assign-name">{props.title}</span></h3> }
                {!editFormToggle ? <button onClick = { () => setEditFormToggle(true)} className = "edit-btn" >EDIT </button> : <button onClick = {handleEditSave} className = "edit-btn">SAVE</button>}
                <h3 className = "assigned-div">ASSIGNED TO:    <span className = "assign-name">  {props.assignedTo}</span> </h3>
               {editAssignedTask ? <select onChange = {handleAssignTaskChange} className = "form-input assignTask" name = "assignedTo"  value = {assignedState.assignedTo}>
                        <option >---Assign Project to  ---</option>
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
                :
                <button onClick = {() => setEditAssignedTask(true)} className ="change-btn">CHANGE</button> }
                {editAssignedTask? <button className = "save-btn" onClick = {handleAssignTaskSave}>SAVE</button> : <></> }

                        
                        <div className = "completed-div">
                        <span className = "completed-title">Completed?</span>
                           {isComplete.isComplete === true ? <input className = "completed-checkbox" type = "checkbox" onChange = {handleCompletedChange} checked /> : <input className = "completed-checkbox"type = "checkbox" onChange = {handleCompletedChange} />}
                        </div>
                {/* <select className = "family-opt">
                    <option>--- Select ---</option>
                    <option>No One</option>
                    <option>Any One</option>
                    <option >Zak</option>
                    <option >Rebecca</option>
                    <option >Kids</option>
                    <option >Pops</option>
                    <option >Grandma Alicia</option>
                    <option >GiGi</option>
                    <option >PaPa</option>
                </select> */}
                       
                    
       
            </div>

    
        </>
    )
}

export default Project