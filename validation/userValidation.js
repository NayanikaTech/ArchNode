// Modules
import Joi from 'joi';

const validation = () => {
    return Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required()
            .messages({
                'any.required': 'Nama Lengkap harus diisi!',
                'string.empty': 'Nama Lengkap harus diisi!',
                'string.min': 'Nama Lengkap harus memiliki setidaknya 3 karakter!',
                'string.max': 'Nama Lengkap tidak boleh lebih dari 50 karakter!'
            }),

        email: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: {
                    allow: ['com', 'net', 'test', 'id']
                }
            })
            .required()
            .messages({
                'any.required': 'Email harus diisi!',
                'string.empty': 'Email harus diisi!',
                'string.email': 'Email harus berupa email yang valid (contoh: user@example.com).',
            }),

        phone: Joi.string()
            .min(10)
            .max(15)
            .pattern(/^(?:\+62|62|0)[2-9][0-9]{7,11}$/) // Format Indonesia
            .required()
            .messages({
                'any.required': 'Nomor telepon harus diisi!',
                'string.empty': 'Nomor telepon harus diisi!',
                'string.pattern.base': 'Nomor telepon harus berupa nomor Indonesia yang valid (misal: +6281234567890, 081234567890).',
                'string.min': 'Nomor telepon minimal harus terdiri dari 10 digit.',
                'string.max': 'Nomor telepon tidak boleh lebih dari 15 digit.',
            }),

        password: Joi.string()
            .min(4)
            .required()
            .messages({
                'any.required': 'Kata Sandi harus diisi!',
                'string.empty': 'Kata Sandi harus diisi!',
                'string.min': 'Kata Sandi minimal harus 4 karakter.',
            })
    })
}

export default validation