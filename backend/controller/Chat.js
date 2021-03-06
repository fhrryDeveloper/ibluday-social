const express = require('express');
const Router = express.Router();
const model = require('../models/Home');
// const config = require("../configure");
const Message = model.Message;
const URLparams = require("../middlewares/UrlParams");

Router.get("/getChatList", (req, res, next) => {
    URLparams(req, (params) => {
        var senderId = params.get("senderId");
        var receiverId = params.get("receiverId");
        if(typeof(senderId) != "string" || typeof(receiverId) != "string")
            res.sendStatus(400);
        else{
            Message.find({ 
                $or : [
                    { senderId : senderId, receiverId : receiverId },
                    { senderId : receiverId, receiverId : senderId }
                ]
            }).then(rdata => {
                res.send(rdata);
            })
        }
    });  
})

module.exports = Router;