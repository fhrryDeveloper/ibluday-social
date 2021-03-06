const config = require("../configure");
var reqPromise = require("request-promise");

const Recaptcha = (token, cb) => {
    var uri = "https://www.google.com/recaptcha/api/siteverify?secret=" + config.gRecaptchaSecretKey + "&response=" + token;
    var options = {
        method: 'POST',
        uri: uri,
        json: true
    };
    reqPromise(options).then(response => {
        cb(response)
    })
}

module.exports = Recaptcha;