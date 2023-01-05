const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: {
    origins: ["http://localhost:8081"],
  },
});
io.on("connection", (socket) => {
  socket.emit("sessionsCounter", socket.adapter.sids.size);
});

http.listen(3000, () => {});
