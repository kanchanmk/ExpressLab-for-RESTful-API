"use strict";

const express = require("express");
const { routes } = require("./routes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", routes);
const port = 3000;
app.listen(port, () => console.log(`listen on port : ${port}`));
