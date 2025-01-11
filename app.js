const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/users");
const bookingsRoutes = require("./routes/bookings");
const testConnection = require("./testConnection");
const generateRoutes = require("./generateRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/bookings", bookingsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

