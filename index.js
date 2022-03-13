const express = require("express");

// Server
const app = express();

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
