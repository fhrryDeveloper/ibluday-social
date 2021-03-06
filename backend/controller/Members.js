const express = require('express');
const Router = express.Router();
const model = require('../models/Home');
const config = require("../configure");
const Users = model.Users;
const Friends = model.Friends;
const URLparams = require("../middlewares/UrlParams");

Router.get("/getMembersCount", (req, res, next) => {
    Users.find({}, (err, rdata) => {
        if(err) 
            res.sendStatus(500);
        else 
            res.json({ count : rdata.length });
    })
})

Router.get("/getMembers", (req, res, next) => {
    URLparams(req, (params) => {
        var count = params.get("count");
        var start = params.get("start");
        var except = params.get("except");
        try{
            count = parseInt(count);
            start = parseInt(start);
        } catch(e){
            console.log(e);
            res.sendStatus(400);
            return;
        }
        if(typeof(count) != "number" || typeof(start) != "number" ||  typeof(except) != "string")
            res.sendStatus(400);
        else{
            if(count < 0 || start < 0){
                res.sendStatus(400);
                return;
            }
            switch(params.get("q")){
                case "friend" : 
                    Friends.find({ $or : [
                        { userEmail : except, status : true },
                        { friendEmail : except, status : true }]
                    }).sort({ username : 1}).skip(start).limit(count).then(async (rdata) => {
                        if(rdata){
                            var userData = [];
                            for(var i = 0; i < rdata.length; i ++){
                                await Users.findOne({ _id : rdata[i].friendId }).then( user => {
                                    userData.push(user);
                                })
                            }
                            res.send(userData);
                        } else {
                            res.sendStatus(500)
                        }
                    });
                    break;
                case "alpha" : {
                    Users.find({ email : {$ne : except }}).sort({ username : 1}).skip(start).limit(count).then((rdata) => {
                        if(rdata){
                            res.send(rdata)
                        } else {
                            res.sendStatus(500)
                        }
                    });
                    break;
                }
                case "new" : {
                    Users.find({ email : {$ne : except }}).sort({ joinedIn : 1}).skip(start).limit(count).then((rdata) => {
                        if(rdata){
                            res.send(rdata)
                        } else {
                            res.sendStatus(500)
                        }
                    });
                    break;
                }
                default : {
                    res.sendStatus(500)
                }
            }
        }
    });  
})

Router.post("/addFriend", (req, res) => {
    var data = req.body;
    Friends.find({ friendId : data.friendId, userId : data.userId }).then(rdata => {
        if(rdata && rdata.length){
            res.send(false)
        } else {
            var savehandle = new Friends( data );
            savehandle.save().then(fdata => {
                if(fdata){
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            });
        }
    })
})

Router.get("/getFriendRequests", (req, res, next) => {
    URLparams(req, (params) => {
        var userId = params.get("userId");
        if(typeof(userId) != "string")
            res.sendStatus(400);
        else{
            Friends.find({ friendId : userId, status : false }).then( async rdata => {
                if(rdata){
                    var userData = [];
                    for(var i = 0; i < rdata.length; i ++){
                        await Users.findOne({ _id : rdata[i].userId }).then( user => {
                            userData.push(user);
                        })
                    }
                    res.send(userData);
                } else {
                    res.sendStatus(500)
                }
            })
        }
    })
})

Router.post("/acceptFriend", (req, res) => {
    var id = req.body.id;
    const filter = { userId : id };
    const update = { status : true };
    Friends.findOneAndUpdate(filter, update).then(rdata => {
        res.send(rdata);
    })
})

Router.post("/getFriendList", (req, res) => {
    var userId = req.body.userId;
    Friends.find({ $or : [{userId : userId},{friendId : userId}], status : true}).then( async rdata => {
        if(rdata){
            var userData = [];
            for(var i = 0; i < rdata.length; i ++){
                await Users.findOne({ _id : rdata[i].userId }).then( user => {
                    userData.push(user);
                })
            }
            res.send(userData);
        } else {
            res.sendStatus(500)
        }
    })
})

module.exports = Router;
