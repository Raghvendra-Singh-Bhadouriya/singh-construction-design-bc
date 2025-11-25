import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import axios from 'axios';

import connection from './config/db.js'; // add .js extension for local file imports
//const projectRoute = require("./Routes/projectsRoute")
import projectRoute from "./Routes/projectsRoute.js"

const PORT = process.env.PORT || 8080;
const server = express();

// cors origin allow two origins locally and deploy ft url.
const allowedOrigins = [
  'http://localhost:5173',
  'https://singh-construction-design.vercel.app'
];

server.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}));

server.get("/ping", (_, res) => {
  res.send("Server is awake!")
})

setInterval(() => {
  axios.get("https://singh-construction-design-bc.onrender.com")
  .then(() => console.log("Pinged server to keep awake"))
  .catch(() => console.log("Ping failed"))
}, 5 * 60 *1000);

server.use(express.json())

server.use("/", projectRoute)


server.get("/", (req, res) => {
    res.status(200).json({message: "This is Home Page"})
    console.log("This is Home Page")
})

server.listen(PORT, async (req, res) => {
    try {
        await connection()
        console.log(`✅ Server is running on port ${PORT}`)
    } catch (error) {
        console.log(`❌ Server is running failed ${error.message}`)
    }
})












// require("dotenv").config();
// const cors = require("cors");
// const express = require("express");
// const PORT = process.env.PORT || 8080
// const server = express();
// const connection = require("./config/db")

// server.use(cors({
//     origin: "https://singh-construction-design.vercel.app", // frontend URL
//     credentials: true
// }));