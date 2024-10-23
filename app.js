// Modules
import express from "express";
import connectDB from "./config/db.js"
import userRoute from './routes/userRoutes.js'
import authRoute from './routes/authRoutes.js'
import authMiddleware from "./middleware/authMiddleware.js";

// Global Config
const app  = express()
const port = 3000;

// Setup Middleware
app.use(express.json())

// Connection
connectDB()

// Use Route
app.use('/api/auth', authRoute)

// With Middleware
app.use('/api/users', authMiddleware, userRoute)

app.listen(port, () => {
    console.log(`Server runing in port : ${port}!`)
})