var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Today = new Date();
const users = new Schema({
    email : { type : String, unique : true, default : ""},
    password : { type : String, default : "" },
    username : { type : String, default : "" },
    gender : { type : String, default : "" },
    birthday : { type : String, default : "" },
    phone : { type : String, default : "" },
    address : { type : String, default : "" },
    country : { type : String, default : "" },
    userRole : { type : String, default : "standard" },
    zipCode : { type : String, default : ""},
    company : { type : String, default : "" },
    avatar :{ type : String, default : "default.jpg" },
    coverImage : { type : String, default : "default.jpg" },
    googleId : { type : String, default : ""},
    joinedIn : { type : String, default : Today.toString() },
    updatedIn : String,
});

const friends = new Schema({
    userId : { type : String, default : ""},
    userEmail : { type : String, default : ""},
    friendId : { type : String, default : ""},
    friendEmail : { type : String, default : ""},
    status : { type : Boolean, default : false }
})

const forums = new Schema({
    title : { type : String, default : "" },
    content : { type : String, default : "" },
    posterId : { type : String, default : "" },
    posterEmail : { type : String, default : "" },
    coverImage : { type : String, default : "" },
    coverImageName : { type : String, default : "" },
    date : { type : String, default : ""}
})

const session = new Schema({
    email : { type : String, unique : true },
    socketId :  { type : String, default : ""},
    timestamp :  { type : String, default : ""},
})

const message = new Schema({
    messageId : { type : String, unique : true },
    message : { type : String, default : ""},
    date : { type : String, default : "" },
    reactions : { type : Array, default : [] },
    senderId : { type : String, default : ""},
    senderEmail : { type : String, default : ""},
    receiverId : { type : String, default : ""},
    receiverEmail : { type : String, default : ""},
    senderAvatar : { type : String, default : "default.jpg" },
    receiverAvatar : { type : String, default : "default.jpg" },
    senderName : { type : String, default : "" },
    receiverName : { type : String, default : "" },
    status : { type : Boolean, default : false}
})

const Users = mongoose.model('users', users);
const Friends = mongoose.model('friends', friends);
const Forums = mongoose.model('forums', forums);
const Session = mongoose.model('session', session);
const Message = mongoose.model('message', message);

exports.Users = Users;
exports.Friends = Friends;
exports.Forums = Forums;
exports.Session = Session;
exports.Message = Message;