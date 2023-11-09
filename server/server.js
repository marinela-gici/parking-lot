const express = require('express');
const cors = require('cors');
const socket = require("socket.io");
const app = express();
const cookieParser = require('cookie-parser');
const paginate = require('express-paginate');

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.urlencoded({extended: true}));
app.use(paginate.middleware(10, 50));

require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/parking.routes')(app);
require('./routes/contact.routes')(app);

const server = app.listen(8000, () => {
  console.log("Listening at Port 8000");
});

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("newReservation", (data) => {
    console.log("newReservation");
    io.emit(`toClient`, data);
  });
});
