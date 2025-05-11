import joi from 'joi'

const register_validation = joi.object({
    name: joi.string().min(3).max(255).required()
        .messages({
                'string.empty': 'Full name is required',
                'string.min': 'Full name must be at least 3 characters',
                'any.required': 'Full name is required',
            }),
        email: joi.string().email({ minDomainSegments: 2, tlds: {allow:['com', 'net']} }).required()
        .messages({
                'string.empty': 'Email is required',
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required',
        }),
        role:joi.string().valid('entrepreneur','investor').required().messages({
            'any.only': 'Role must be either entrepreneur or investor',
            'string.empty': 'Role is required',
            'any.required': 'Role is required',
        }),
        password: joi.string().min(8).required()
        .messages({
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 8 characters',
                'any.required': 'Password is required',
            }),
})

const login_validation = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: {allow:['com', 'net']} }).required()
    .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required',
        }),
    password: joi.string().min(8).required()
    .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters',
            'any.required': 'Password is required',
        }),

})

export {register_validation,login_validation}