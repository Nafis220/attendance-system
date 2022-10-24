const AdminAttendence = require('../model/AdminAttendence')
const error = require('../utils/error')
const {addMinutes,isAfter} = require('date-fns')

const getEnable = async(req, res, next) => {
    try{
        const running = await AdminAttendence.findOne({status:'RUNNING'})
        
        if(running){
            throw error('already running',400)
        }
        
        const attendance = new AdminAttendence()
        await attendance.save()
        res.status(201).json({message:'success',attendance})}
     catch(e)
    {next(e)}
    
}

const getStatus = async(req, res, next)=>{
    try{
        const attendance = await AdminAttendence.findOne({status:'RUNNING'})
        if(!attendance){
            throw error(`Not Running`,400)
        }
     const started = addMinutes(new Date(attendance.createdAt), attendance.timeLimit)
     if(isAfter(new Date(),started)){
        attendance.status = 'COMPLETED',
        await attendance.save()
     }


        res.status(200).json(attendance)
    } 
    catch(e){
  
        next(e)
    }
}



const getDisable = async(req, res, next) => {
    try{
        const attendance = await AdminAttendence.findOne({status:'RUNNING'})
        if(!attendance){
            throw error(`Not Running`,400)
        }
        attendance.status = 'COMPLETED',
        await attendance.save()
        res.status(200).json(attendance)
    }
      

        catch(e){
            next(e)
        }
}

module.exports = {
    getEnable,
    getDisable,
    getStatus
}