const   
    express = require("express"),
    app = express(),
    socket = require("socket.io");
    


//middleware
app.use(express.static("public")); // the server will look for a static index.html file in the public folder to serve up to the client. 

 
const server = app.listen(3000, err => {
    console.log(err || "Listenting to Port");
});

//Socket setup
const io = socket(server); //argument accepts what server we want to work wtih. Now we are setup for socket.io on the backend. The socke.io is now going to be sitting around in the server waiting for a client/browser to make a connection and setup a websocket between the two. What we can do now is listen out for when that conenction is made, so to do we can add a event listener on the io variable:
io.on("connection", function(socket) {
    console.log("made socket connection", socket.id);

    socket.on("chat", function(data) {
        io.sockets.emit("chat",data);// send data back to all sockets. 
    }) // we're listening on the socket for the chat message which we set up in the front end. Once it hears the chat option, it will fire this callback frunction. The data parameter will hold the data that we sent from the front end. 
});
//Say we have 10 different clients, all making a conncetion; each one is going to have their own socket between that client and the server. WHhen on particular client connects, here we're going to listen out for that connection event, then fire the callback function. We now need to laod the socket.io libray on the fron ent in the index.html file. 