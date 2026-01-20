const express=require('express');
const signupController=require('../controller/signup');


const router=express.Router();
router.post("/Register",signupController.createUser);

module.exports = router;