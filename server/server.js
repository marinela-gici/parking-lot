const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.urlencoded({extended: true}));

require('./config/mongoose.config');
require('./routes/user.routes')(app);
require('./routes/parking.routes')(app);

const server = app.listen(8000, () => {
  console.log("Listening at Port 8000");
});