const path = require("path");
const resolveUrlLoader = require('craco-resolve-url-loader');
module.exports = {
    plugins:[{
        plugin : resolveUrlLoader
    }],
    webpack: {
        alias: {
            '@app' : path.resolve(__dirname, "src/"),
            '@pages' : path.resolve(__dirname, "src/pages/"),
            '@config' : path.resolve(__dirname, "src/config/"),
            '@components' : path.resolve(__dirname, "src/components/"),
            '@assets' : path.resolve(__dirname, "src/assets/"),
            '@styles' : path.resolve(__dirname, "src/styles/"),
            '@actions' : path.resolve(__dirname, "src/redux/actions"),
            '@constants' : path.resolve(__dirname, "src/redux/constants"),
            '@reducers' : path.resolve(__dirname, "src/redux/reducers"),
            '@store' : path.resolve(__dirname, "src/redux/store"),
        }
    }
}