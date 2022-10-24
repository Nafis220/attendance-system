const StudentAttendance = require('../model/StudentAttendence')
const AdminAttendence = require('../model/AdminAttendence')
const error = require('../utils/error')
const {addMinutes,isAfter} = require('date-fns')


const getAttendance = async(req,res,next) => {
    const {id} = req.params 
    
    try{const attendance = await AdminAttendence.findById(id)
        
        if(!attendance){
            throw error('Attendance ID Invalid ',400)
        
        }
        
        if(attendance.status === 'COMPLETED'){
            throw error('Attendance Already Completed',400)
        }
        

        let newAttendance = await StudentAttendance.findOne ({
            adminAttendence : id,
            user: req.user._id
        })
        if (newAttendance) {
            
			throw error(`Already registered `, 400);
            
		}
    newAttendance = new StudentAttendance({
        user: req.user._id,
        adminAttendence : id
    })    


        await newAttendance.save()
        
        res.status(200).json({message:'Attendance Completed',newAttendance})}
        catch(e){
            next(e)
        }

}



const getAttendanceStatus = async(req,res,next) => {
    
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


      return  res.status(201).json(attendance)
    } 
    catch(e){
  
        next(e)
    }
}

module.exports = {
    getAttendance, getAttendanceStatus,
}