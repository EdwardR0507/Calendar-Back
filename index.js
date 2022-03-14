const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");

// Server
const app = express();

// Connect to database
dbConnection();

// Public directory
app.use(express.static("public"));

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
