import express from "express";
import db from "./database.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);

// Error Handler
app.use(notFound);
app.use(errorHandler);

// Test database connection
try {
  await db.authenticate();
  console.log("Database Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.listen(PORT, console.log(`Server is running at port ${PORT}`));
