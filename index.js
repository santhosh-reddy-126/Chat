import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port= 4000;
const server = createServer(app)
const io = new Server(server);

app.get("/",(req,res)=>{
    res.render("index.ejs");
    
})

io.on("connection",(socket)=>{
    console.log("user connected");
    socket.on("chat",(f)=>{
        socket.broadcast.emit("chat",(f));
        socket.emit("chat",(f));
    })
    
    socket.on("disconnect",()=>{
        console.log("user disconnected");
    })
})
server.listen(port,()=>{
    console.log(`server running on port ${port}`);
});