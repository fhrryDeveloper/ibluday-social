const model = require('./models/Home');
const Session = model.Session;
const Message = model.Message;

const saveNewMessage = ({ message : mdata, receiver, sender }, cb) => {
    console.log(mdata, receiver, sender)
    var MessageObj = new Message( {
        messageId : mdata.messageId,
        message : mdata.message,
        date : mdata.date,
        reactions : mdata.reactions,
        senderId : sender._id,
        senderEmail : sender.email,
        receiverId : receiver._id,
        receiverEmail : receiver.email,
        senderAvatar : sender.avatar,
        receiverAvatar : receiver.avatar,
        senderName : sender.username,
        receiverName : receiver.username,
        status : false
    });
    MessageObj.save(err => {
        if(err) cb(false)
        else cb(true)
    })
}

const listen = (io) => {
    io.on('connection', (socket) => {
        var connectedUser = null
        try{
            connectedUser = JSON.parse(socket.handshake.query.user)
        } catch(e){
            socket.emit("error", e.toString());
            return;
        }
        if(connectedUser.email && socket.id){
            var assignSession = new Session( {
                email : connectedUser.email,
                socketId : socket.id,
                timestamp : Date.now()
            } );
            Session.findOne({ email : connectedUser.email }).then(rdata => {
                if(!rdata){
                    assignSession.save(err => {
                        if(err)
                            socket.emit("error", err.toString());
                        else
                            socket.broadcast.emit("new_user", connectedUser);
                    })
                } else {
                    Session.deleteOne({ email : connectedUser.email }).then(rdata => {
                        if(rdata.ok == 1){
                            assignSession.save(err => {
                                if(err)
                                    socket.emit("error", err.toString());
                                else
                                    socket.broadcast.emit("new_user", connectedUser);
                            })
                        } else {
                            socket.emit("error", "something went wrong!")
                        }
                    })
                }
            })
            socket.on("new_message", (data) => {
                Session.findOne({ email : data.receiver.email }).then(rdata => {
                    if(rdata){
                        saveNewMessage(data, (isSaved) => {
                            if(isSaved)
                                io.sockets.to(rdata.socketId).emit("new_message", data);
                            else
                                socket.emit("error", "something went wrong!")
                        })
                    } else {
                        socket.emit("error", "something went wrong!")
                    }
                })
            })
            socket.on("disconnect", () => {
                Session.deleteOne({ socketId : socket.id });
            })
        } else {
            socket.emit("error", "something went wrong!")
        }
    });
}
exports.listen = listen;