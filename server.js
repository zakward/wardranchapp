const express = require("express")
const app = express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const path = require('path');
require("dotenv").config()
const {expressjwt} = require("express-jwt")
uri = process.env.MONGODB_URI
const PORT = process.env.PORT || 3000

// var options = {
//     dotfiles: 'ignore',
//     etag: false,
//     extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//     index: ['index.html'],
//     maxAge: '1m',
//     redirect: false
//   }



//middleware

app.use(express.json())
app.use(morgan("dev"))
// app.use(express.static('build', options))

//static files
app.use(express.static(path.join(__dirname, "client", "build")))


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// connect to

mongoose.connect(
    uri,
    (err) => {
        if (err) throw err
        console.log("Connected to the DataBase")
        })

    
app.listen(PORT, () => {
    console.log(`The Server is running on Port ${PORT}`)

} 
)

//routes

// NOTE: changed tasks to projects on the front end
app.use("/api/tasks", require("./routes/taskRouter.js"))
app.use("/api/supplies", require("./routes/suppliesRouter.js"))
app.use("/auth", require("./routes/authRouter.js"))
app.use("/api", expressjwt({secret: process.env.SECRET, algorithms:['HS256']}))




// error handling
// app.use((err, req, res, next) => {
//     console.log(err)
//     return res.send({errMsg: err.message})
// })

app.use((err, req, res, nexdt) => {
    console.log(err)
    if(err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})




// app.listen(PORT, () => {
//     console.log(`The Server is running on Port ${PORT}`)
// })
