// Modules
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Initialize
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        return res.status(401).send({
            status: false,
            message: 'Akses Ditolak! Tidak ada token yang dikirim.'
        })
    }

    try {
        // Initialize
        const isMatch = jwt.verify(token, process.env.JWT_SECRET)
        req.user = isMatch

        next()
    } catch (error) {
        res.status(401).send({
            status: false,
            message: 'Token tidak valid! Silahkan login kembali untuk mengakses data.'
        })
    }
}

export default authMiddleware