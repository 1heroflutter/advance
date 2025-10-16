$(document).ready(function () {
  /* global io */
  let socket = io();

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("user count", function (data) {
    console.log(data);
  });

  socket.on("user", function (data) {
    $("#num-users").text(data.currentUsers + " users online");
    let message =
      data.username + (data.connected ? " has joined the chat." : " has left the chat.");
    $("#messages").append($("<li>").html("<b>" + message + "</b>"));
  });

  socket.on("chat message", (data) => {
    console.log("socket.on 1");
    $("#messages").append($("<li>").text(`${data.username}: ${data.message}`));
  });
  $("form").submit(function () {
    var messageToSend = $("#m").val();
    socket.emit("chat message", messageToSend);
    $("#m").val("");
    return false;
  });
});
