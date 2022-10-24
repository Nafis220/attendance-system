const User = require('../model/User')
const error = require('../utils/error')

const findUsers = () => {
    
    return  User.find();
}

const findUserByProperty = (key, value) => {
	if (key === '_id') {
		return User.findById(value);
	}
	return User.findOne({ [key]: value });
};


const createNewUser = ({name,email,password,roll , accountStatus}) =>{
    const user = new User({name,
        email,
        password,
    roll: roll ? roll : ['STUDENT'],
    accountStatus: accountStatus ? accountStatus : 'PENDING'
    })
    return user.save()
}


const updateUser = async(id,data) => {
    const user = await findUserByProperty('email',data.email);
    if(user){
        throw error('Email Already Exist',400)
    }
    return User.findOneAndUpdate(id,{...data},{new:true})
}
module.exports = {
    findUserByProperty,createNewUser,findUsers,updateUser
}