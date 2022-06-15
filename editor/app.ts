// expressjs app
import app from "./www";
const dotenv = require("dotenv");

dotenv.config();

// port number
const port = process.env.PORT;

// socket io conf
const http = require("http").Server(app);
const io = require("socket.io")(http);

var countUserPresence: number = 0;

io.on("connection", (socket: any) => {
  console.log("A user connected");
  countUserPresence += 1;
  socket.on("disconnect", () => {
    console.log("user disconnected");
    countUserPresence -= 1;
    if (countUserPresence == 0) {
      console.log("Zero users present");
    }
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
