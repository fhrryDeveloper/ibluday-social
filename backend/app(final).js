/* Define The Headers */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./configure');
const cors = require('cors');
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");

const socket = require("./socket");
/* Import Controller */
const Auth = require("./controller/Auth");
const Members = require("./controller/Members");
const Forum = require("./controller/Forum");
const Upload = require("./controller/Upload");
const Chat = require("./controller/Chat");

/* Create Server */
const server = require("http").Server(app); // Node Server
const io = require('socket.io')(server, {
  cors: { origin: "*" }
});
/* MongoDB Connection */
mongoose.connect(
  config.URL + config.DBNAME, { 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify : false
}).then(
  () => { console.log('database was connected successfully') },
  err => { console.log("can't connect to the database by"+ err) }
);

/* Main */
app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'app')));
app.use(bodyParser.json({limit: "15360mb", type:'application/json'}));
app.use(bodyParser.urlencoded({limit: "15360mb",extended: true,parameterLimit:5000000,type:'application/json'}));

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

/* Listen All Request */
app.use("/api/auth", Auth);
app.use("/api/members", authenticateToken, Members);
app.use("/api/forum", authenticateToken, Forum);
app.use("/api/upload", authenticateToken, Upload);
app.use("/api/chat", authenticateToken, Chat);
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/app/index.html");
})
socket.listen(io);
server.listen(config.ServerPort, () => {
  console.log("server is running on " + config.ServerPort);
});

