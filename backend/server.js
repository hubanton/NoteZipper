const notes = require("./data/notes");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routers/userRouters");
const noteRoutes = require("./routers/noteRouters");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();

connectDB();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Listening to ${PORT}`));
