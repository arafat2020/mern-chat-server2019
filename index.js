const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const userrouter = require('./router/auth');
const loginRouter = require('./router/login');
const roomRouter = require('./router/room')
const msgRoter = require('./router/msg')
const verifyRouter = require('./router/verify');
const http = require('http')
const { Server } = require('socket.io')
const logoutRouter = require('./router/logout')

// middleware//
app.use(cors())
app.use(express.json())
//middleware end//


// DB connection
const url = 
    "mongodb+srv://arafat:1234@cluster0.7khld.mongodb.net/?retryWrites=true&w=majority";
    mongoose.connect(url, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("DB connected");
        }
      });
// DB connection end
app.get("", (req, res) => {
  res.send("server running");
});
app.use(userrouter)
app.use(loginRouter)
app.use(roomRouter)
app.use(msgRoter)
app.use(verifyRouter) 
app.use(logoutRouter)
// port//
const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "chatserver.vercel.app",
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
io.on('connection', (socket) => {
  console.log('connected to the client')
  socket.on('msgUdate', (res) => {
    io.emit('msgUdate',res)
  })
})
server.listen(port, () => {
    console.log(`server running at port ${port}`);
  });
//port end//