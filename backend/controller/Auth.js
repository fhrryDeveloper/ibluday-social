const express = require('express');
const Router = express.Router();
const model = require('../models/Home');
const jwt = require("jsonwebtoken");
const config = require("../configure");
const Recaptcha = require("../middlewares/Recaptcha");
const URLparams = require("../middlewares/UrlParams");
const Users = model.Users;

generateAccessToken = (auth_data) => {
    return jwt.sign(auth_data, config.TOKEN_SECRET, { expiresIn: '3600s' });
}

/* JWT Authentication */
authenticateToken = (req, res, next) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
    jwt.verify(token, config.TOKEN_SECRET, (err, user) => {
      if (err) return res.send(err)
      next() // pass the execution off to whatever request the client intended
    })
}

Router.post("/signinWithGoogle", (req, res, next) => {
    var data = req.body;
    var token = null;
    Users.findOne({ googleId : data.googleId }, (err , rdata)=>{
        if(err){
            res.send({
                token : token,
                data : null
            })
        }else{
            if(rdata == null){
                var savehandle = new Users( data );
                savehandle.save().then(rdata=>{
                    if(!rdata){
                        res.send({
                            token : token,
                            data : null
                        })
                    } else {
                        token = generateAccessToken({auth_data : rdata});
                        res.send({
                            token : token,
                            data : rdata
                        })
                    }
                });
            } else {
                token = generateAccessToken({auth_data : rdata});
                res.send({
                    token : token,
                    data : rdata
                })
            }
        }
    })
})
Router.post("/signin", (req, res, next) => {
    var gRecaptchaToken = req.body.gRecaptchaToken;
    if(!gRecaptchaToken)
        res.sendStatus(400);
    Recaptcha(gRecaptchaToken, (response) => {
        if(response.success){
            var data = req.body;
            var token = null;
            Users.findOne({ email : data.email, password : data.password }, (err , rdata)=>{
                if(err){
                    res.send({
                        token : token,
                        data : false
                    })
                }else{
                    if(rdata == null){
                        res.send({
                            token : token,
                            data : null
                        })
                    } else {
                        token = generateAccessToken({auth_data : rdata});
                        console.log(`${rdata.username}(${rdata.email}) just signed in`);
                        res.send({
                            token : token,
                            data : rdata
                        })
                    }
                }
            })
        } else {
            res.sendStatus(400);
        }
    })
});

Router.post("/signup", (req, res, next) => {
    var gRecaptchaToken = req.body.gRecaptchaToken;
    if(!gRecaptchaToken)
        res.sendStatus(400);
    Recaptcha(gRecaptchaToken, (response) => {
        if(response.success){
            var data = req.body;
            delete data.gRecaptchaToken;
            data.joinedIn = new Date();
            var savehandle = new Users( data );
            savehandle.save().then(rdata=>{
                if(!rdata){
                    res.send({
                        token : token,
                        data : null
                    })
                } else {
                    token = generateAccessToken({auth_data : rdata});
                    res.send({
                        token : token,
                        data : rdata
                    })
                }
            });
        } else {
            res.sendStatus(400);
        }
    });
})

Router.post("/emailCheck", (req, res, next) => {
    Users.findOne({email : req.body.email}, (err, rdata) => {
        if(err){
            res.sendStatus(500);
        } else {
            if(rdata != null)
                res.send(true)
            else    
                res.send(false)
        }
    })
})

Router.post("/sessionCheck", async (req, res, next) => {
    var token = await generateAccessToken({auth_data : req.body});
    Users.findOne({email : req.body.email}, (err, rdata) => {
        if(err){
            res.json({
                status : "error"
            });
            return next();
        } else {
            if(rdata != null){
                res.json({
                    data : rdata,
                    token : token
                });
                return next();
            } else {
                res.json({
                    status : "error"
                });
                return next();
            }
        }
    })
});

Router.get("/createFakeUsers", (req, res) => {
    URLparams(req, (params) => {
        var count = params.get("count")
        if(count){
            for(var i = 0; i < count; i ++){
                var data = {
                    email : `ibluday${i}@gmail.com`,
                    username : `ibluday${i}`,
                    password : `ibluday`,
                    joinedIN : new Date()
                }
                data.joinedIn = new Date();
                var savehandle = new Users( data );
                savehandle.save();
            }
            res.sendStatus(200)
        } else {
            res.sendStatus(400)
        }
    })
})

module.exports = Router;
