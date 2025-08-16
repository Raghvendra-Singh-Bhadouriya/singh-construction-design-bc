require("dotenv").config();
const cors = require("cors");
const express = require("express");
const PORT = process.env.PORT || 3000
const server = express();
const connection = require("./config/db")


server.use(cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true
}));

server.use(express.json())

const projectRoute = require("./Routes/projectsRoute")



server.use("/", projectRoute)

server.get("/", (req, res) => {
    res.status(200).json({message: "This is Home Page"})
    console.log("This is Home Page")
})




// const allowedOrigins = [
//   'http://localhost:5173',
//   //'https://raghvendra-bhadouriya-portfolio.vercel.app'
// ];

// server.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true
// }));

server.listen(PORT, async (req, res) => {
    try {
        await connection()
        console.log(`✅ Server is running on port ${PORT}`)
    } catch (error) {
        console.log(`❌ Server is running failed ${error.message}`)
    }
})