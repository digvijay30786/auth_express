const express = require('express');
const router = express.Router();
const user = require('../model/user.model');
const post = require('../model/post.model');

const jwt = require('jsonwebtoken');
require("dotenv").config();

const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
}


const signup = async (req, res) => {
    
    try
    {
        const postuser = await user.create(req.body);
        const token = newToken(postuser);
        return res.status(201).json({"data":token});
    }
    catch (err)
    {
        res.status(500).json({ "type": "error", "error": err.message });
    }
    
}


const signin = async (req, res) => {
    
    try {

        const { email,password } = req.body;
        const userone = await user.findOne({ email });
        
        if (!userone)
        {
            return res.status(400).json({ "type": "error", "msg": "Email id does not exist in our Databas" });
        }

        const match = userone.checkPassword(password);

        if (!match)
        {
            return res.status(400).json({ "type": "error", "msg": "Credntials not valid" });
        }

        // const token = newToken(userone);

        // res.status(200).json({ token });

        const id = userone.id;
        const getPost = await post.find({ user: { $eq: id } }).lean().exec();
        res.status(200).json({ getPost });
  
    }
    catch (err) {
        res.status(500).json({ "type": "error", "error": err.message });
    }
    
}



module.exports  = {signin,signup};