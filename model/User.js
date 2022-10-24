const {model,Schema} = require('mongoose')

const userSchema = new Schema({
    name:{
        type:String,
        minlength:[3,'Name is too short'],
        maxLength:[20,'Name is too Long'],
        required:true
    },
    email:{
        type:String,
        required:true,
        validator:{
            validate:function(value){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
                message: (props) => {`Invalid Email: ${props}`} 
        }
    },
    password:{
        type:String,
        minlength:[5,'Password is too'],
        required:true
    },
    roll:{
        type:[String],
        required:true,
        default:['STUDENT'],

    },
    accountStatus:{
        type:String,
        default:'PENDING',
        enum:['PENDING','ACTIVE','REJECTED'],
        required:true
    }
})

const User = model('User',userSchema) 
module.exports = User 