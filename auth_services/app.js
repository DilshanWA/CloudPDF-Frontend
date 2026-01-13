const express = require("express");
const cors = require("cors"); 
require('colors');  // Import colors
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
connectDB();
app.use(cors({ 
  origin: "http://localhost:3000", // your frontend URL
  credentials: true               // <--- allow cookies
}));
app.use(express.json());

const Routers = require('./routes/auth.routes');

app.use('/api/', Routers);

app.listen(8000, () => {
  console.log(
    "Server running at http://localhost:8000".bgRed.white.bold + "\n" +
    "API is ready to accept requests!".blue
  );
});