const express = require("express");
const app = express();

const cors = require("cors");

require('dotenv-safe').config();

const db = require('./database/mongoConfig'); //configurações mongo
db.connect();


app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use("/user", userRoutes);

module.exports = app;