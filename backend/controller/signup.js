
const userService = require('../services/signup');

async function createUser(req,res)
{
    try{
        const userData = req.body;
        const user = await userService.createUser(userData);
        res.status(201).json({ user:user,message:"user created Successfully"});
    }
    catch(error)
    {
        console.log(error);
        res.status(401).json({message:error.message});
    }
}

module.exports={createUser};