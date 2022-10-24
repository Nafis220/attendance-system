// this is a middleware that makes any route as private route
const User = require('../model/User')
const jwt = require('jsonwebtoken')

async function  authenticate (req, res, next)  {

    let token = req.headers.authorization
    if(!token){
        res.status(401).json({message:'Unauthorized'})
    }
   try{ 
    token = token.split(' ')[1];
    let decoded = jwt.verify(token,'secret-key')
    let user  = await User.findById(decoded._id)
   console.log(user)
   if(!user){
   return  res.status(401).json({message: 'Unauthorized'})
   }
   req.user = user
   next()
}
   catch(e){
    res.status(400).json({message:'Invalid Token'})
   }
}
 module.exports = authenticate