require('dotenv').config()
const express = require("express");
const app = express();
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const jobRouter = require("./routes/jobRouter");
const { unknownEndpoint,errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Middlewares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static('view')); // Serve static assets
connectDB();

// Use the userRouter for all /users routes
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);

// Handle all other routes with the React app
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
