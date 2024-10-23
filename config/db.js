// Modules
import mongoose from "mongoose";
import 'dotenv/config'

// Setup
const connectDB = async () => {
    // Initialize
    const url = `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`

    try {
        await mongoose.connect(url)

        console.log('Koneksi database berhasil.')
    } catch (err) {
        console.log({
            status: false,
            message: err.message
        })

        process.exit(1)
    }
}

export default connectDB