const routes = require('express').Router();
const userController = require('../controller/user.js')


routes.put('/:userId',userController.putUserById)
routes.patch('/:userId',userController.patchUserById)
routes.delete('/:userId',userController.deleteUserById)
routes.get('/:userId',userController.getUserById)
routes.get('/',userController.getUser)
routes.post('/',userController.postUser)
module.exports = routes