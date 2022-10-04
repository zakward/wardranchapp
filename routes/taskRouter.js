const express = require("express")
const taskRouter = express.Router()
const Task = require("../models/task.js")



//get all
taskRouter.get("/", (req, res, next) => {
    Task.find((err, tasks) =>  {
        if (err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(tasks)
    })
})

//post one
taskRouter.post("/", (req, res, next) => {
    req.body.user = req.auth._id
    const newTask = new Task(req.body) 
    newTask.save((err, savedTask) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedTask)
    })
})

taskRouter.delete("/:taskId", (req, res, next) => {
    Task.findOneAndDelete({ _id: req.params.taskId, user: req.body._id }, (err, deletedTask) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(`Successfully removed ${deletedTask.title}`)
    })
})

//get by location
taskRouter.get("/search/location", (req, res, next) =>{
    Task.find({ location : req.query.location}, (err, foundLocation) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(foundLocation)
    })
})

//edit one or put 

taskRouter.put("/:taskId", (req, res, next) => {
    Task.findOneAndUpdate({_id: req.params.taskId, user: req.body._id}, req.body, {new: true}, (err, updatedTask) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedTask)
    })
})

//get by assignedTo
taskRouter.get("/search/assignedTo", (req, res, next) => {
    Task.find({assignedTo :  req.query.assignedTo}, (err, tasks) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(tasks)
    })
})

// Get tasks by user id

taskRouter.get("/user", (req, res, next) => {
    Task.find({user: req.body._id}, (err, tasks) =>{
        if (err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(tasks)
    })
})

module.exports = taskRouter