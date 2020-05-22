let express = require("express");
let app = express();

// process.env.PORT is related to deploying on heroku
let server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Listening at http://" + host + ":" + port);
}

app.use(express.static("public"));

let io = require("socket.io")(server);

io.sockets.on("connection", function (socket) {
  console.log("We have a new client: " + socket.id);

  socket.on("mouse", function (data) {
    console.log("Received: 'mouse' " + data.x + " " + data.y);

    socket.broadcast.emit("mouse", data);
  });

  socket.on("disconnect", function () {
    console.log("Client has disconnected");
  });
});
