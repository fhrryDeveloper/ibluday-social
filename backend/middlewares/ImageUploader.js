const fs = require("fs");
const path = require("path");
const config = require("../configure");
const uniqid = require('uniqid');

const UploaderManager = ({files, body}, filepath, cb) => {
    var filename = `${uniqid()}_${filepath}_image`
    var originalname = files[0].originalname;
    var originalname = originalname.split('.');
    var new_path = config.BASEURL + '/uploads/' + filepath + '/' + filename + '.' + originalname[originalname.length-1];
    var old_path = files[0].path;
    var save_path =  filename + '.' + originalname[originalname.length-1];
    fs.readFile(old_path, function(err, data) {
        fs.writeFile(new_path, data, function(err) {
            fs.unlink(old_path, async err => {
                if(!err){
                    cb(save_path)
                } else {
                    cb(false)
                }
            })
        });
    });
}
module.exports  = UploaderManager;