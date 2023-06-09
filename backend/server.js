const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`listening in port number ${port}`));
