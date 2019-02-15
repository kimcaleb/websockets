//MAKE COnnection
var socket = io.connect("http://localhost:3000");

//Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');

//Emit events
btn.addEventListener("click",function() {
    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    }); //this will emit a message down the websocket to the backend server. First argument is the name of the message, call it whatever you want. The second is teh data,object, we'll be sending to the server. In the serverside, we now need to handle the received data. 
});

//Listen for events
socket.on("chat", function(data) {
    output.innerHTML += "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>"; 
});