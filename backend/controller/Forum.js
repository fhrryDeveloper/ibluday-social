const express = require('express');
const Router = express.Router();
const model = require('../models/Home');
const config = require("../configure");
const Forums = model.Forums;
const multer = require('multer');
const ImageUploader = require('../middlewares/ImageUploader');

Router.post('/savePost', multer({dest:config.BASEURL + '/uploads/forum/'}).any(), async (req,res, next) => {
    ImageUploader(req, "forum", (result) => {
        if(result){
            var data = req.body;
            data.date = new Date();
            data.coverImage = result;
            var savehandle = new Forums( data );
            savehandle.save().then(rdata => {
                if(rdata){
                    res.sendStatus(200)
                } else {
                    res.sendStatus(500)
                }
            });
        } else {
            res.sendStatus(500)
        }
    })
})

Router.get("/getAllForums", (req, res) => {
    Forums.find().then(rdata => {
        res.send(rdata);
    })
})

module.exports = Router;