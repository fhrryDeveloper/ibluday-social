const URLparams = (req, cb) => {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; 
    const URLdata = new URL(fullUrl);
    const params = URLdata.searchParams;
    cb(params)
}
module.exports = URLparams;