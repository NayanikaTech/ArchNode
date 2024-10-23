// Modules
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

// Create Document Schema
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

// Set Paginate
schema.plugin(mongoosePaginate)

const users = mongoose.model('User', schema)

// Export Module
export default users