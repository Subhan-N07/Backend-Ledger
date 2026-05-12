// const express = require('express');
// const cors = require('cors');
require("dotenv").config()
const app = require('./src/app')
const connectDB = require('./src/DATABASE/db');
connectDB();

// app.use(express.json());
// app.use(cors());


app.listen(3000 , () => {
  console.log("Server running on port 3000")
}
)