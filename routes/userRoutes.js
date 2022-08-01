const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const roles = require('../utils/roles');



router.get('/user/:id', userController.userById, roles.allowIfLoggedin);
router.get('/users', userController.allUsers, roles.allowIfLoggedin, roles.grantAccess('readAny', 'profile'));
router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.put('/user/:userId', roles.allowIfLoggedin,roles.grantAccess('updateAny', 'profile'), userController.updateUser);
 
router.delete('/user/:userId', roles.allowIfLoggedin, roles.grantAccess('deleteAny', 'profile'), userController.deleteUser);
 
module.exports = router;
