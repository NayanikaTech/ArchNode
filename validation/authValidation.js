// Modules
import Joi from "joi";

const validation = () => {
    return Joi.object({
        email: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: {
                    allow: ['com', 'id', 'test']
                }
            })
            .required()
            .messages({
                'any.required': 'Email harus diisi!',
                'string.empty': 'Email harus diisi!',
                'string.email': 'Email harus berupa email yang valid (contoh: user@example.com)'
            }),
    
        password: Joi.string()
            .min(4)
            .required()
            .messages({
                'any.required': 'Email harus diisi!',
                'string.empty': 'Email harus diisi!',
                'string.min': 'Kata Sandi minimal 4 karakter.'
            })
    })
}

export default validation