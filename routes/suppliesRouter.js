const express = require("express")
const suppliesRouter = express.Router()
const Supply = require("../models/supply.js")

//get all
suppliesRouter.get("/", (req, res, next) => {
    Supply.find((err, supply) =>  {
        if (err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(supply)
    })
})

//post one
suppliesRouter.post("/", (req, res, next) => {
    
    const newSupply = new Supply(req.body) 
    newSupply.save((err, savedSupply) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedSupply)
    })
})

suppliesRouter.delete("/:supplyId", (req, res, next) => {
    Supply.findByIdAndDelete( {_id: req.params.supplyId},
        (err, deletedSupply) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted Supply item ${deletedSupply.item}`)
        }
        )
})

suppliesRouter.get("/:supplyId",(req, res, next) => {
    Supply.findById({ _id: req.params.supplyId},
        (err, foundSupply) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(foundSupply)
        })
} )

// taskRouter.put("/:taskId", (req, res, next) => {
//     Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, (err, updatedTask) => {
//         if(err) {
//             res.status(500)
//             return next(err)
//         }
//         res.status(200).send(updatedTask)
//     })
// })

suppliesRouter.put("/dateOfPurchase/:supplyId", (req, res, next) => {
    Supply.findByIdAndUpdate(
        { _id: req.params.supplyId},

         {
            $addToSet: {dateOfPurchase: req.body.dateOfPurchase}
         }, 

         {new: true}, 

         (err, updatedSupply) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(updatedSupply)
    }) 
})

suppliesRouter.put("/:supplyId", (req, res, next) => {
    Supply.findByIdAndUpdate(
        {
            _id: req.params.supplyId
        },
        req.body,
        {new: true},
        (err, updatedSupply) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            res.status(200).send(updatedSupply)
        }
    )
})

suppliesRouter.get("/search/urgent", (req, res, next) => {
    Supply.find( {urgent: req.query.urgent} , (err, foundUrgent) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(foundUrgent)
    })
})





module.exports = suppliesRouter