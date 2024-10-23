// Modules
import users from '../models/userModel.js'
import userValidation from '../validation/userValidation.js'
import moment from 'moment';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

// Routes
const index = async (req, res) => {
    try {
        // Initialize
        const options = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 20
        }

        // Search
        const { search } = req.query

        let query = {}

        if (search) {
            query = {
                name: {
                    $regex: search,
                    $options: 'i' // Case-insensitve
                }
            }
        }

        // Use Paginate
        const response = await users.paginate(query, {
            ...options,
            sort: { createdAt: -1 }
        })

        // Moment
        moment.locale('id');

        // List Data
        const datas = response.docs.map((item, i) => ({
            id: item._id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            createdAt: moment(item.createdAt).format('D MMMM Y HH:mm:ss')
        }))

        res.status(200).send({
            status: true,
            message: 'Berhasil mendapatkan data.',
            data: datas,
            meta: {
                total: response.totalDocs,
                page: response.page,
                limit: response.limit,
                totalPages: response.totalPages,
                nextPage: response.nextPage,
                prevPage: response.prevPage
            }
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

const store = async (req, res) => {
    // Validation
    const { error: validationError } = userValidation().validate(req.body)

    if (validationError) {
        return res.status(400).json({
            status: false,
            message: validationError.details[0].message
        })
    }

    try {
        // Salt Password
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

        // Initalize
        const data = new users({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword
        })

        const response = await data.save()

        res.status(200).send({
            status: true,
            message: 'Berhasil menambahkan data.',
            data: response
        })
    } catch (error) {
        res.status(500).send({
            status: true,
            message: error.message
        })
    }
}

const show = async (req, res) => {
    try {
        // Initialize
        const id = req.params.id
        const response = await users.findOne({_id: id})

        res.status(200).send({
            status: true,
            message: 'Berhasil mendapatkan data.',
            data: response
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

const update = async (req, res) => {
    // Validation Params
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            status: false,
            message: 'ID Pengguna tidak valid!'
        })
    }

    // Validation Body
    const { error: validationError } = userValidation().validate(req.body)

    if (validationError) {
        return res.status(400).json({
            status: false,
            message: validationError.details[0].message
        })
    }

    try {
        // Get Data
        const existsData = await users.findOne({_id: req.params.id})

        if (!existsData) {
            return res.status(404).send({
                status: false,
                message: 'Data pengguna tidak ditemukan.'
            })
        }

        // Check Password
        if (req.body.password) {
            // Initialize
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            
            req.body.password = hashedPassword;
        }

        // Update Data
        const data = await users.findByIdAndUpdate(
            id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )

        res.status(200).send({
            status: true,
            message: 'Berhasil mengubah data.',
            data: data
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

const destroy = async (req, res) => {
    // Validation Params
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            status: false,
            message: 'ID Pengguna tidak valid!'
        })
    }
    
    try {
        // Initialize
        const existsData = await users.findOne({ _id: id });

        if (!existsData) {
            return res.status(404).send({
                status: false,
                message: 'Data pengguna tidak ditemukan.'
            });
        }

        await users.findByIdAndDelete(id)

        res.status(200).send({
            status: true,
            message: 'Data berhasil dihapus.',
            data: {
                id,
                date: moment().format('D MMMM Y HH:mm:ss')
            }
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error.message
        })
    }
}

export { index, store, show, update, destroy }