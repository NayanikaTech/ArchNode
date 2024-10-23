// Modules
import users from '../models/userModel.js'
import authValidation from '../validation/authValidation.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// Routes
const signin = async (req, res) => {
    // Validation
    const { error: validationError } = authValidation().validate(req.body, { abortEarly: false })

    if (validationError) {
        return res.status(400).send({
            status: false,
            message: validationError.details[0].message
        })
    }

    try {
        // Check Data
        const response = await users.findOne({email: req.body.email})

        if (!response) {
            return res.status(404).send({
                status: false,
                message: 'Pengguna tidak ditemukan.'
            })
        }

        // Password Verify
        const isMatch = await bcrypt.compare(req.body.password, response.password)

        if (!isMatch) {
            return res.status(400).send({
                'status': false,
                'message' : 'Password yang dimasukkan salah.'
            })
        }
        
        // Generate Token
        const token = jwt.sign({ id: response._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(200).send({
            status: true,
            message: 'Login berhasil',
            data: {
                id: response.id,
                name: response.name,
                email: response.email
            },
            token: token
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

export { signin }