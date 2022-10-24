const User = require('../model/User')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByProperty,createNewUser} = require('./user')
const error = require('../utils/error')

const registerService = async({name, email, password,roll,accountStatus}) => {
    let user = await findUserByProperty('email', email); 
   if(user){
   throw error('User already registered',400)
   }
    
   
    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(password,salt)
    return createNewUser({name,email,password:hash,roll,accountStatus}) 
   
}


const loginService = async({ email, password }) => {
    const user = await findUserByProperty('email',email)
            
            if(!user){
             
                throw error('Invalid Credentials',400)
            }
    
            const isMatched = await bcryptjs.compare(password,user.password)
           
            if(!isMatched) {
              
                throw error('Invalid Credentials',400)
            }
           const payLoad = {
            _id: user._id,
            name: user.name,email,
            email:user.email,
            roles: user.roles,
            accountStatus: user.accountStatus,
           } 
            return jwt.sign(payLoad,'secret-key',{expiresIn:'5h'})
}

module.exports = {registerService,loginService}