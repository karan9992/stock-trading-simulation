const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000;
const connectDb = require('./config/db')
const userRoutes = require("./routes/userRoutes.js")

//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//connection
connectDb()

//routes

app.use("/api/users", userRoutes);

app.listen(PORT, () => { console.log("Server Running at :", PORT); })