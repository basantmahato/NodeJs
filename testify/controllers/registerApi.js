const mongoose = require("mongoose");
const User = require("../models/user");

const registerApi = async (req, res) => {

    try {
        const userData = req.body;
        console.log("User data received:", userData);


        if( User.findOne({email: userData.email})){

            res.send({message: "User already exists", data: userData})

        }else
            {
        const user = new User(userData);
        await user.save();
        res.send({ message: "User registered successfully", data: userData });
        console.log({ message: 'User registered successfully', data: savedUser });
}

        
    }catch(err){
        res.status(400).send({ error: error.message });
        console.log({ error: error.message });
    }

}

module.exports = registerApi;