const mongoose = require("mongoose");

const { DATABASE_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose.connect(DATABASE_URI)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("Error connecting to database");
      console.error(error);
      process.exit(1);
    });
};
