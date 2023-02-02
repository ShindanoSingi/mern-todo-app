const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json());

// Port
const PORT = process.env.PORT || 5500;

app.listen(PORT, () =>
    console.log(`Server connected`)
    // console.log(`Listening on PORT ${PORT}`)
)