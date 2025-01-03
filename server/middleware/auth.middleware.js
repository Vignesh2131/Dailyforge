const express = require("express");
const jwt = require("jsonwebtoken")
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
        const verify = jwt.verify(token, process.env.JWT_SECRET)
        res.status(200).send({user:verify})
        next();
        } catch (err) {
           return res.status(401).send({
             message: "Unauthorized",
           }); 
        }      
    } else {
        return res.status(401).send({
            message:"Unauthorized"
        })
    }
   
}

module.exports = authMiddleware