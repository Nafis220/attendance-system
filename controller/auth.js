const User = require('../model/User')
const {registerService,loginService} = require('../services/auth')

const registerController = async(req,res,next)=>{

    const {name , email , password} = req.body;
    
    if(!name || !email || !password){

        return res.status(400).json({message:'invalid data'})
    } 
    
   try{
    
    const user = await registerService({name,email, password})
    
    return res.status(201).json({message:'New user created successfully',user })
  }catch(e){
    console.log(e)
    next(e)
  }

}

const loginController = async(req,res,next) => {
   
        const {email, password} = req.body
        try{
          const token = await loginService({email, password})
            
          return  res.status(200).json({message:'Login Successful', token})
        }
        catch(e){
         next(e)
        }
    

}

module.exports = {
    registerController,loginController
}