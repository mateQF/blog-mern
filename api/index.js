require("dotenv").config();
require("./mongo.js");
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/auth.routes.js')
const postRoutes = require('./routes/posts.routes.js')
const notFound = require('./middleware/notFound.js')

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use('/api', authRoutes)
app.use('/api', postRoutes)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT --> [${PORT}]`);
});

app.use(notFound)

module.exports = app
