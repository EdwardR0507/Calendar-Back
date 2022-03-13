const express = require("express");
require("dotenv").config();

// Server
const app = express();

// Public directory
app.use(express.static("public"));

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
