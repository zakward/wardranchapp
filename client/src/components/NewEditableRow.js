
import { React, useState } from "react"

function NewEditableRow({task, saveEdits}) {

    
    const [editFormData, setEditFormData] = useState({
        location:  task.location,
        title:  task.title,
        priority:  task.priority,
        isComplete:  task.isComplete,
        assignedTo:  task.assignedTo
    })


    function handleEditInputChange(e) {
        const {name, value} = e.target
        setEditFormData(prevEditFormData => {
            return {
                ...prevEditFormData,
                [name] : value
            }
        })
    }
        
        function editSave(e) {
            e.preventDefault()
            console.log("save btn was pressed")
            console.log(task._id)
            saveEdits(task._id, editFormData)
        }

        // function newSaveEdit(e) {
        //     e.preventDefault()
        //     saveEdit
        // }

    


    return (
        <tr>
                          <td ><select onChange ={handleEditInputChange}  className = "editable-row" name = "location" value = {editFormData.location}>
                              <option>Inside</option>
                              <option>Outside</option></select>
                              </td>
                         <td><input onChange ={handleEditInputChange}   className = "editable-row" type = "text" name = "title" value = {editFormData.title}/></td>
                         <td>
                              <select onChange ={handleEditInputChange}  className = "editable-row" name = "assignedTo" value = {editFormData.assignedTo}>
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
                           </td>
                         <td><select onChange ={handleEditInputChange}   className = "editable-row" name = "isComplete" value = {editFormData.isComplete} >
                                   <option value = "true">True</option>
                                  <option value = "false">False</option>
                               </select></td>
                         <td><select onChange ={handleEditInputChange}  className = "editable-row" name = "priority" value = {editFormData.priority}>
                                      <option value = "Very High">High Priority</option>
                                      <option value = "none">No Priority</option>
                          </select></td>
                        <td><button className = "form-submit-btn edit-save-btn" onClick = {editSave} >SAVE</button></td> 
                  </tr>
    )
}


export default NewEditableRow