const express = require("express");
const userRoute = require("./routes/userroute"); // Adjust the path if necessary

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the route
app.use("/users", userRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
