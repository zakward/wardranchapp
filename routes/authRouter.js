const auth = require("basic-auth")
const express = require("express")
const authRouter = express.Router()
const User = require("../models/User.js")
const jwt = require("jsonwebtoken")


//SIgnup
authRouter.post("/signup", (req, res, next) => {
  User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(user){
      res.status(403)
      return next(new Error("Username is already taken"))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
      const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
      return res.status(201).send({token, user: savedUser})
    })
  })
})

authRouter.post("/login", (req, res, next) => {
  User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if (!user) {
      res.status(403) 
      return next(new Error("Username or Password are incorrect"))
    }
    if (req.body.password != user.password){
      res.status(403)
      return next(new Error("Username or Password are incorrect"))
    }
    const token = jwt.sign(user.toObject(), process.env.SECRET)
    return res.status(200).send({token, user})
  })
})


//get request to see all users
authRouter.get("/", (req, res, next) => {
  User.find((err, users) =>  {
      if (err) {
          res.status(500)
          return next(err)
      }
      res.status(200).send(users)
  })
})

//put request to edit a user
authRouter.put("/:userId", (req, res, next) => {
  User.findOneAndUpdate({_id: req.params.userId, user: req.body._id}, req.body, {new: true}, (err, updatedUser) => {
      if(err) {
          res.status(500)
          return next(err)
      }
      res.status(200).send(updatedUser)
  })
})
// authRouter.post("/signup", async (req, res) => {
//   try {
//     const {username, password} = req.body
//     if (!username || !password) {
//       return res.json({message: "Please enter all the details"})
//     }

//     const userExist = await User.findOne({username: req.body.username})
//     if (userExist) {
//       return res.json( {message: "Username already exists"})
//     }
//     const salt = await bcrypt.genSalt(10)
//     const hashPassword = await bcrypt.hash(req.body.password, salt)
//     req.body.password = hashPassword
//     const user = new User(req.body)
//     await user.save()
//     const token = await jwt.sign({id: user._id}, process.env.SECRET)
//     return res.cookie({"token": token}).json({sucess: true, message: "User Created"})
//   }
//   catch (error) {
//     return res.json( {error: error})
//   }
// })
// SIGN UP 
// authRouter.post("/signup", (req, res, next) => {    
//     User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
//                 if (err) { 
//                     res.status(500)            
//                     return next(err)       
//                  }       
//                   if (user) {       
//                          res.status(403)           
//                           return next(new Error("That username is already taken"))        
//                         }        
//                         const newUser = new User(req.body)       
//                          newUser.save((err, savedUser) => {  
//                                       if(err) {                
//                                         res.status(500)                
//                                         return next(err)          
//                                       }            
//                                         const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)        
//                                             return res.status(201).send({token, user: savedUser.withoutPassword()})        })    })})
// // LOGIN ROUTE
// authRouter.post("/login", (req, res, next) => {    
//     User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {      
//           if (err) {            
//             res.status(500)            
//             return next(err)        
//         }      
//           if (!user) {           
//            res.status(403)          
//             return next(new Error("Username or password are incorrect"))        }  

//             user.checkPassword(req.body.password, (err, isMatch) => {    
//                         if (err) {             
//                                res.status(403)                
//                                return next(new Error("Username or password are incorrect"))                                }  
                               
//                                          if (!isMatch) {              
//                                             res.status(403)                
//                                             return next(new Error("Username or password are incorrect"))            }            
                                            
//                                             const token = jwt.sign(user.withoutPassword(), process.env.SECRET)            
//                                             return res.status(200).send({ token, user : user.withoutPassword() })        })    })})
module.exports = authRouter

