import locales from "./locales";
import * as fakeDB from "./fake-db";
import countries from "./countries";
import * as slick from "./slick";

const devURL = "http://192.168.104.83:10040";
// const prodURL = "https://api.ibluday.com";

const prefixUrl = (para, type) => {
    if(para)
    {
        if(para.indexOf("https") >= 0 || para.indexOf("http") >= 0){
            return para;
        } else {
            return config.HOSTURL + "/" + type + "/" + para;
        }
    } else {
        return "assets/cover/default.png"
    }
}

const removeRecaptcha = () => {
    const script = document.getElementById("google-recaptcha");
    if(script)
        script.remove();
    const badge = document.getElementsByClassName("grecaptcha-badge");
    if(badge[0])
        badge[0].remove();
    console.log("Removed Recaptcha")
}

const loadRecaptcha = (cb) => {
    // load the script by passing the URL
    loadScriptByURL("google-recaptcha", `https://www.google.com/recaptcha/api.js?render=${config.siteKey}`, function (result) {
        if(result)
            cb(true)
        else    
            cb(false)
    });
}

const loadScriptByURL = (id, url, callback) => {
    const isScriptExist = document.getElementById(id);
 
    if (!isScriptExist) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
            if (callback) callback(true);
        };
        script.onerror = function (){
            if (callback) callback(false)
        }
        document.body.appendChild(script);
    }
    if (isScriptExist && callback) callback(true);
}

const navigators = [
    {title : 'Newsfeed', path : "news"},
    {title : 'Overview', path : "overview"},
    {title : 'Members', path : "members"},
    {title : 'Groups', path : "groups"},
    {title : 'Badges', path : "badges"},
    {title : 'Trophy', path : "trophy"},
    {title : 'Events', path : "events"},
    {title : 'Forum', path : "forum"},
    {title : 'Chat', path : "chat"}
]

const stringToHtml = string => {
    var div = document.createElement("div");
    div.id = Date.now().toString();
    div.innerHTML = string;
    var el = div;
    return el;
}

const config = {
    defaultSettings : {
        locale : "en",
        drawerOpen : false,
        activeDrawer : 0,
    },
    HOSTURL : devURL,
    fakeDB : fakeDB,
    prefixUrl : prefixUrl,
    locale : locales,
    countries : countries,
    navigators : navigators,
    stringToHtml : stringToHtml,
    googleClientId : "103559864438-j3b594qmobnea3coogkdrk1jnp49mc3e.apps.googleusercontent.com",
    siteKey : "6Le83zkaAAAAABT6Na5BINcnm_YCp4kpnKJw3VlU",
    loadRecaptcha : loadRecaptcha,
    removeRecaptcha : removeRecaptcha,
    redirectUri : "http://localhost:1004",
    slick : slick,
}

export default config;
