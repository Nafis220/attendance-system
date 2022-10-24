const User = require('../model/User')
const userService = require('../services/user')
const authService = require('../services/auth')
const error = require('../utils/error')

const getUser = async (req,res,next ) =>{
    try{
     const users = await userService.findUsers()
     res.status(200).json(users)
    }
    catch(err){
        next(err);
        
}
}

const getUserById = async(req,res,next) =>{
   const userId = req.params.userId
   try{
    const user = await userService.findUserByProperty('_id',userId)
    
    if(!user){
    throw error('user not found',404)
}
   return res.status(200).json(user)
   }
   catch(err){
       next(err);
       
}
}

const postUser = async(req,res,next) =>{
    const {name,email,password,roll,accountStatus} = req.body;
  try{
    const user = await authService.registerService({name,email,password,roll,accountStatus})
    return  res.status(201).json(user)
  }
  catch(err)
  {next(e)}

}

const putUserById = async(req,res,next) =>{
  const {userId} = req.params;
  const {name,roll,accountStatus,email} = req.body;

  try{
    const user = await userService.updateUser(userId,{name,roll,accountStatus,email})
    if(!user){
      throw error('User not found',404)
    }
   res.status(200).json(user)
  }
  catch(e){
    next(e)
  }
}

const patchUserById = async(req,res,next) =>{
  const {userId} = req.params;
  const {name,roll,accountStatus} = req.body;
  try{
    const user = await userService.findUserByProperty('_id',userId)

    if(!user){
      throw error('User not found',404)
    }
    user.name = name ?? user.name
    user.roll = roll ?? user.roll
    user.accountStatus = accountStatus ?? user.accountStatus
    await user.save()
    res.status(200).json(user)
  }
  catch(e)
  {next(e)} 
}

const deleteUserById = async(req,res,next) =>{
  const {userId} = req.params
  try{
    const user = await userService.findUserByProperty('_id',userId)
    if(!user){
     error('User not found',404)
    }
   await user.remove()
  return  res.status(203).send()
  }catch(e){
 next(e)
  }
}

module.exports = {
    getUser, getUserById, postUser ,putUserById, patchUserById, deleteUserById,
}