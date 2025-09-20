const Joi = require('joi');

const createSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required()
});

const updateSchema = Joi.object({
    name: Joi.string().min(2).optional(),
    email: Joi.string().email().optional()
});

const valueSchema = Joi.object({
    value: Joi.number().positive().required()
});

exports.validateCreate = (req, res, next) => {
    const { error } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};

exports.validateUpdate = (req, res, next) => {
    const { error } = updateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};

exports.validateValue = (req, res, next) => {
    const { error } = valueSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
};
