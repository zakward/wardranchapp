import React from "react"
function ReadOnlyRow({task, editClick, handleDelete}) {

    console.log(task)

    function deleteTableProject(e) {
        e.preventDefault()
        handleDelete(task._id)
    }


    return (
        <>
                        <tr>
                            <td>{task.location}</td>
                            <td>{task.title}</td>
                            <td>{task.assignedTo}</td>
                            <td>{task.isComplete ? "Complete" : "Not Complete"}</td>
                            <td className = {task.priority === "Very High" ? "priority" : "" }>{task.priority}</td>
                            <td>
                                <button className = "edit-button read-only"   onClick = {(event) => editClick(event, task)}>EDIT</button>
                                <button className = "table-delete-btn" onClick = {deleteTableProject}  >DELETE</button>
                            </td>
                        </tr>
        </>
    )
}
export default ReadOnlyRow