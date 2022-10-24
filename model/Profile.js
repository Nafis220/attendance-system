const {model,Schema} = require('mongoose')

const profileSchema = new Schema({
    firstName:String,
    lastName:String,
    phone:string,
    avatar:string,
    /* User is used to make a relation with the user file*/ 
    user:{
        type:Schema.Type.ObjectId,
        ref:User //It is the name of the module name 
    }
})

const Profile = model('Profile',profileSchema) 
module.exports = Profile 