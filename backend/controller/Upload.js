const express = require('express');
const Router = express.Router();
const Model = require('../models/Home');
const config = require("../configure");
const multer = require('multer');
const Users = Model.Users; 
const ImageUploader = require('../middlewares/ImageUploader');

Router.post('/changeProfileCoverImage', multer({dest:config.BASEURL + '/uploads/coverimage/'}).any(), async (req,res, next) => {
    ImageUploader(req, "coverimage", (result) => {
        if(result){
            const filter = { _id : req.body.id };
            const update = { coverImage : result };
            // Sets `name` and unsets all other properties
            Users.findOneAndUpdate(filter, update, (err) => {
                if(err){
                    res.json({
                        status : "error"
                    })
                } else {
                    res.json({
                        status : "success"
                    })
                }
            });
        } else {
            res.json({
                status : "error"
            })
        }
    });
})

Router.post('/changeUserAvatar', multer({dest:config.BASEURL + '/uploads/avatar/'}).any(), async (req,res, next) => {
    ImageUploader(req, "avatar", (result) => {
        if(result){
            const filter = { _id : req.body.id };
            const update = { avatar : result };
            // Sets `name` and unsets all other properties
            Users.findOneAndUpdate(filter, update, (err) => {
                if(err){
                    res.json({
                        status : "error"
                    })
                } else {
                    res.json({
                        status : "success"
                    })
                }
            });
        } else {
            res.json({
                status : "error"
            })
        }
    });
})

module.exports = Router;