import {React, useState, useEffect} from "react"
import axios from "axios"
import pushpin from "./pushpin.png"
import Project from "./Project"
import TableProjects from "./TableProjects"
import Form from "./Form"
import Navbar from "./Navbar"


function Projects() {




    const [projectArr, setProjectArr] = useState([])
    const [formStatus, setFormStatus] = useState(false)
    const [viewToggle, setViewToggle] = useState(false)
    // const tasksElements = tasksArr.map(task => {
    //     return <Task {...task} onDelete = {handleDelete} onEdit = {handleEdit} />
    // })
    function getProjects() {
        axios.get("/api/tasks")
            .then(res => setProjectArr(res.data))
            // .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }




    useEffect(() => {
        getProjects()
    }, [] )

    function toggleFormStatus() {
        setFormStatus(false)
        console.log("form-test")
    }
    // console.log(tasksArr)
        function handleFilterView(e) {
            if (e.target.value === "Inside") {
                axios.get("api/tasks/search/location?location=Inside")
                    .then(res => setProjectArr(res.data))
                    .catch(err => console.log(err))
                console.log("inside stuff")
            }
            else if (e.target.value === "Outside") {
                axios.get("api/tasks/search/location?location=Outside")
                     .then(res => setProjectArr(res.data))
                    .catch(err => console.log(err))
                console.log("outside stuff")
        }
        else if (e.target.value === "ALL") {
            getProjects()
        }
        }
        function handleFilterTaskView(e) {
            if (e.target.value === "No One" ) {
                axios.get(`/api/tasks/search/assignedTo?assignedTo=No One`)
                    .then(res => setProjectArr(res.data))
                    .catch(err => console.log(err))
            }
            else if (e.target.value === "Any One" ) {
                axios.get(`/api/tasks/search/assignedTo?assignedTo=Any One`)
                    .then(res => setProjectArr(res.data))
                    .catch(err => console.log(err))
            }
            else if (e.target.value === "Zak") {
                axios.get(`/api/tasks/search/assignedTo?assignedTo=Zak`)
                    .then(res => setProjectArr(res.data))
                    .catch(err => console.log(err))
            }
            else if (e.target.value === "Rebecca" ) {
                axios.get(`/api/tasks/search/assignedTo?assignedTo=Rebecca`)
                    .then(res => setProjectArr(res.data))
                    .catch(err => console.log(err))
            }
            else if (e.target.value === "Kids" ) {
                axios.get(`/api/tasks/search/assignedTo?assignedTo=Kids`)
                    .then(res => setProjectArr(res.data))
                    .catch(err => console.log(err))
            }
            else if (e.target.value === "Pops") {
                axios.get(`api/tasks/search/assignedTo?assignedTo=Pops`)
                    .then(res => setProjectArr(res.data))
                    .catch(err => console.log(err))
            }
            else if (e.target.value === "Grandma Alicia" ) {
                axios.get(`api/tasks/search/assignedTo?assignedTo=Grandma Alicia`)
                    .then(res => setProjectArr(res.data))
                    .catch(err => console.log(err))
            }
            else if (e.target.value === "GiGi") {
                axios.get(`api/tasks/search/assignedTo?assignedTo=GiGi`)
                    .then(res => setProjectArr(res.data))
                    .catch(err => console.log(err))
            }
            else if (e.target.value === "Papa" ) {
                axios.get(`api/tasks/search/assignedTo?assignedTo=Papa`)
                    .then(res => setProjectArr(res.data))
                    .catch(err => console.log(err))
            }
            else if (e.target.value === "ALL") {
                getProjects()
            }
        }
        //ADD TASK
        function addProject(project) {
            console.log("add project was executed")
            axios.post("api/tasks", project)
                .then(res => setProjectArr(prevProjectArr => {
                    return [
                        ...prevProjectArr,
                        project
                    ]
                }) )
                .catch(err => console.log(err))
                setFormStatus(false)
        }
        function deleteProject(projectId) {
            console.log("the delete btn was pressed!")
            axios.delete(`/tasks/${projectId}`)
                .then(res => setProjectArr(prevProjectArr =>  {
                    return [
                        ...prevProjectArr.filter(project => project._id !== projectId)
                    ]
                }))
                .catch(err => console.log(err))
        }
        // function handleTableEditSave(taskId, edits) {
        //     axios.put(`/tasks/${taskId}`, edits)
        //         .then(res => setTasksArr(prevTasksArr => {
        //             return [
        //                 ...prevTasksArr.filter(task => task._id !== taskId),
        //                 res.data
        //             ]
        //         }))
        // }
        const projectElements = projectArr.map(project => {
            return (
                <>
                    <Project  getProjects = {getProjects} editAssignProject = {handleAssignProject} delete = {deleteProject} key = {project._id} {...project}/>
                </>
            )
                })
        function toggleForm() {
            setFormStatus(!formStatus)
        }
        function handleAssignProject(iD, edits) {
            console.log(iD)
            console.log(edits)
            axios.put(`/tasks/${iD}`, edits)
                .then(res => setProjectArr(prevProjectArr => {
                    return prevProjectArr.map(project => {
                        return project._id === iD ? res.data : project
                    })
                }))
                .catch(err => console.log(err))
        }
        function toggleView(e) {
            if(e.target.checked) {
                setViewToggle(!viewToggle)
            }
            else {
                setViewToggle(false)
            }
        }
        function editSaveFinal(iD, edits) {
            console.log(iD)
            console.log(edits)
            axios.put(`/tasks/${iD}`, edits)
                .then(res => setProjectArr(prevProjectArr => {
                    return prevProjectArr.map(project => {
                        return project._id === iD ? res.data : project
                    })
                }))
                .catch(err => console.log(err))
        }

   
        console.log(viewToggle)
        console.log(formStatus)
    return (
        <>
            
            <div className = "task-container">
                <div className = "project-background">

                </div>
                <h1 className = "task-header">Projects</h1>
                <div className = "task-header-options">
                <div className = "dark-mode view-mode">
                        <span className = "dark-title-card card-view">CARD VIEW</span>
                        <label className = "switch">
                           <input type = "checkbox" onChange = {toggleView}  />
                            <span className= "slider round project-view"></span>
                        </label>
                        <span className = "dark-title-card table-view">TABLE VIEW</span>
                        </div>
                      
                <div className = 'button-options'>
                     <span className = "select-button">
                        <label>FILTER BY LOCATION</label>
                            <select onChange = {handleFilterView}>
                                <option className = "invalid" disabled>LOCATION</option>
                                <option value = "ALL">ALL</option>
                                <option value = "Inside">Inside</option>
                                <option value = "Outside">Outside</option>
                            </select>
                     </span>
                <span className = "filter-view-container">
                    <select className = "filter-view-btn" onChange = {handleFilterTaskView}>
                        <option>--- FILTER PROJECT BY PERSON ---</option>
                        <option value = "ALL">ALL</option>
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
                </span>
                </div>
                
                
                <button className = {!formStatus ? "add-form" : "no-form"} onClick = {toggleForm}>ADD PROJECT!</button>
                <div className = "priority-msg"><img  className = "pushpin"src = {pushpin} />=    HIGH PRIORITY</div>
               
                <div className = "task-wrapper">
                    
                    
              {viewToggle ? !formStatus ? <TableProjects delete = {deleteProject} submitEdits = {(iD, edits) => editSaveFinal(iD, edits)} data = {projectArr}/> : <Form cancel = {toggleForm} addProject = {addProject}/> :  !formStatus ? projectElements : <Form cancel = {toggleForm} addProject = {addProject} /> }
                        </div>
                </div>
                
            </div>
        </>
    )
}
  
  export default Projects