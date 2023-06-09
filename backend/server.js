const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening in port number ${port}`));
