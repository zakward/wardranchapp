import { React, useState } from "react"
import "../index.css"
import ReadOnlyRow from "./ReadOnlyRow"
import NewEditableRow from "./NewEditableRow"

function TableProjects(props) {
    const [editTaskId, setEditTaskId] = useState(null)

    const [isEditing, setIsEditing] = useState(false)

    function handleEditClick(e, task) {
        e.preventDefault()
        setIsEditing(true)
        console.log(task._id)
        setEditTaskId(task._id)
        // props.data.map(project => {
        //      if(project._id === task._id)
        //      {
        //          setIsEditing(true)
        //     }
        //      else {
        //     console.log("fail")
        // }
        }
      
       
    
    function handleDeleteTask(iD) {
        props.delete(iD)
    }

    console.log(props.data)

    function handleEditSave(iD, edits){
        console.log(iD)
        console.log(edits)
       setIsEditing(false) 
     props.submitEdits(iD, edits)

    }

   
    console.log(editTaskId)
    
 
    return (
        <>
            <form>
                <table>
                   <thead>
                        <tr>
                        <th>Location</th>
                        <th>TASK</th>
                        <th>ASSIGNED TO</th>
                        <th>COMPLETED</th>
                        <th>PRIORITY</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                 <tbody>
                     {props.data.map(task => (
      
      <>
                      {isEditing === true  ? 
                      
                       <NewEditableRow  saveEdits = {handleEditSave } task = {task}/>
                   :
                        <ReadOnlyRow handleDelete = {handleDeleteTask}  editClick = {handleEditClick} task = {task} />
                   }
                       </>
                                     ))
                    }
                    </tbody>
                </table>
            </form>  
        </>
    )
}

export default TableProjects












