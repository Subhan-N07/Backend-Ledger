const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Server connected to DATABASE")
  }
  )
  .catch(() => {
    console.log("Error connecting to Database")
    process.exit(1)
  }
  )
};

module.exports = connectDB;