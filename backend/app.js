const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const usersRouter = require("./routes/usersRouter");
require("dotenv").config({ override: true });

const flash = require("./middleware/flash");
const trimInput = require("./middleware/trimInput");
const db = require("./config/mongoose-connection");

const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // default Vite port
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use(flash);
app.use(trimInput);
app.use("/users", usersRouter);
app.listen(process.env.PORT || 3000);
