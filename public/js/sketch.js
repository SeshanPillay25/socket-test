let socket;

function setup() {
  createCanvas(1400, 700);
  background(0);
  // Start a socket connection to the server
  socket = io.connect("https://socket-test-sesh.herokuapp.com/");
  // We make a named event called 'mouse' and write an
  // anonymous callback function
  socket.on(
    "mouse",
    // When we receive data
    function (data) {
      console.log("Got: " + data.x + " " + data.y);
      // Draw a blue circle
      fill(0, 0, 255);
      noStroke();
      ellipse(data.x, data.y, 20, 20);
    }
  );
}

function draw() {
  // Nothing
}

function mouseDragged() {
  // Draw some white circles
  fill(100);
  noStroke();
  ellipse(mouseX, mouseY, 20, 20);
  // Send the mouse coordinates
  sendmouse(mouseX, mouseY);
}

// Function for sending to the socket
function sendmouse(xpos, ypos) {
  // We are sending!
  console.log("sendmouse: " + xpos + " " + ypos);

  // Make a little object with  and y
  let data = {
    x: xpos,
    y: ypos,
  };

  // Send that object to the socket
  socket.emit("mouse", data);
}
